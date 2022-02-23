/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require("fs");
const path = require("path");
const { performance, PerformanceObserver } = require("perf_hooks");
const yaml = require("js-yaml");

const { DefaultEnvironment } = require("..");
const { json } = require("./mocks/filters/json");
const { money, moneyWithCurrency } = require("./mocks/filters/money");
const {
  assetUrl,
  defaultPagination,
  globalAssetUrl,
  imgTag,
  linkTo,
  linkToType,
  linkToVendor,
  shopifyAssetUrl,
  stylesheetTag,
  scriptTag,
  urlForType,
  urlForVendor,
  productImgUrl,
  pluralize,
  within,
} = require("./mocks/filters/shop");
const {
  linkToTag,
  highlighActiveTag,
  linkToAddTag,
  linkToRemoveTag,
} = require("./mocks/filters/tag");
const { weight, weightWithUnit } = require("./mocks/filters/weight");
const { CommentFormTag } = require("./mocks/tags/commentForm");
const { PaginateTag } = require("./mocks/tags/paginate");
const { DefaultContext } = require("../lib/context");
const { LoggingUndefined, LaxUndefined } = require("../lib/undefined");

const obs = new PerformanceObserver((list, observer) => {
  const measures = {
    lex: [],
    parse: [],
    render: [],
    lexParseAndRender: [],
  };

  list.getEntries().forEach((e) => measures[e.name].push(e.duration));

  for (const [name, durations] of Object.entries(measures)) {
    const best = Math.min(...durations) / 1000;
    console.log(
      `${name} (best of ${durations.length}): ${best.toFixed(2)} seconds`
    );
  }

  observer.disconnect();
});

obs.observe({ entryTypes: ["measure"], buffer: true });

function loadData() {
  let data;
  try {
    data = yaml.load(fs.readFileSync("fixtures/vision.database.yml", "utf8"));
  } catch (e) {
    console.log(e);
    process.exit(1);
  }

  const collectionMembers = {};

  for (const collection of data.collections) {
    collectionMembers[collection.id] = collection.products.map((p) => p.id);
  }

  for (const product of data.products) {
    const productCollections = [];
    for (const collection of data.collections) {
      if (product.id in collectionMembers[collection.id]) {
        productCollections.push(JSON.parse(JSON.stringify(collection)));
      }
    }
    product.collections = productCollections;
  }

  data.product = data.products[0];
  data.blog = data.blogs[0];
  data.article = data.blog.articles[0];
  data.cart = {
    total_price: data.line_items
      .map((i) => i.line_price * i.quantity)
      .reduce((a, b) => a + b, 0),
    item_count: data.line_items.length,
    items: data.line_items,
  };

  data.collections = Object.fromEntries(
    data.collections.map((o) => [o.handle, o])
  );
  data.collection = data.collections.snowboards;
  data.blogs = Object.fromEntries(data.blogs.map((o) => [o.handle, o]));
  data.linklists = Object.fromEntries(
    data.link_lists.map((o) => [o.handle, o])
  );
  data.pages = Object.fromEntries(data.pages.map((o) => [o.handle, o]));
  data.page = data.pages.frontpage;

  return data;
}

function _readFile(p) {
  try {
    return {
      path: p,
      source: fs.readFileSync(p, "utf8"),
    };
  } catch (err) {
    console.error(err);
  }
}

const _isFile = (fn) => {
  return fs.lstatSync(fn).isFile();
};

const _isDir = (fn) => {
  return fs.lstatSync(fn).isDirectory();
};

function loadThemeTemplates(themeRoot) {
  const templatePaths = fs
    .readdirSync(themeRoot)
    .map((fileName) => {
      return path.join(themeRoot, fileName);
    })
    .filter(_isFile);

  const layoutPath = path.join(path.dirname(templatePaths[0]), "theme.liquid");
  templatePaths.splice(templatePaths.indexOf(layoutPath), 1);

  return {
    layout: _readFile(layoutPath),
    templates: templatePaths.map(_readFile),
  };
}

function loadThemes(themesRoot) {
  const themePaths = fs
    .readdirSync(themesRoot)
    .map((fileName) => {
      return path.join(themesRoot, fileName);
    })
    .filter(_isDir);

  return themePaths.map(loadThemeTemplates);
}

function registerMocks(env) {
  env.filters["json"] = json;
  env.filters["money"] = money;
  env.filters["money_with_currency"] = moneyWithCurrency;
  env.filters["asset_url"] = assetUrl;
  env.filters["default_pagination"] = defaultPagination;
  env.filters["global_asset_url"] = globalAssetUrl;
  env.filters["img_tag"] = imgTag;
  env.filters["link_to"] = linkTo;
  env.filters["link_to_type"] = linkToType;
  env.filters["link_to_vendor"] = linkToVendor;
  env.filters["shopify_asset_url"] = shopifyAssetUrl;
  env.filters["stylesheet_tag"] = stylesheetTag;
  env.filters["script_tag"] = scriptTag;
  env.filters["url_for_type"] = urlForType;
  env.filters["url_for_vendor"] = urlForVendor;
  env.filters["product_img_url"] = productImgUrl;
  env.filters["pluralize"] = pluralize;
  env.filters["highlight_active_tag"] = highlighActiveTag;
  env.filters["link_to_add_tag"] = linkToAddTag;
  env.filters["link_to_remove_tag"] = linkToRemoveTag;
  env.filters["link_to_tag"] = linkToTag;
  env.filters["weight"] = weight;
  env.filters["weight_with_unit"] = weightWithUnit;
  env.filters["within"] = within;

  env.tags["form"] = CommentFormTag;
  env.tags["paginate"] = PaginateTag;
}

const environment = new DefaultEnvironment({
  globals: loadData(),
  undefinedFactory: (n) => new LaxUndefined(n),
});
registerMocks(environment);
environment.globals.page_title = "Page Title";

function parseThemeTemplates(theme) {
  const templates = [];
  for (const t of theme.templates) {
    templates.push(
      environment.fromString(t.source, t.path, {
        template: path.basename(t.path),
      })
    );
  }

  return {
    layout: environment.fromString(theme.layout.source, theme.layout.path, {
      template: path.basename(theme.layout.path),
    }),
    templates: templates,
  };
}

function parseThemes(themes) {
  return themes.map(parseThemeTemplates);
}

async function renderThemeTemplates(theme) {
  for (const template of theme.templates) {
    const content = await template.render();
    await theme.layout.render({ content_for_layout: content });
  }
}

async function renderThemes(themes) {
  for (const theme of themes) {
    await renderThemeTemplates(theme);
  }
}

function parse(number = 100) {
  const themeSources = loadThemes("./fixtures/");
  const n = themeSources
    .map((t) => t.templates.length)
    .reduce((a, b) => a + b + 1, 0);
  console.log(
    `parsing ${themeSources.length} themes with ${n} templates total, ` +
      `repeating ${number} times`
  );

  performance.mark("parse-start");
  for (let i = 0; i < number; i++) {
    parseThemes(themeSources);
  }
  performance.mark("parse-end");
  performance.measure("parse", "parse-start", "parse-end");
}

async function render(number = 100) {
  const themeSources = loadThemes("./fixtures/");
  const n = themeSources
    .map((t) => t.templates.length)
    .reduce((a, b) => a + b + 1, 0);

  const themes = parseThemes(themeSources);

  console.log(
    `rendering ${themeSources.length} themes with ${n} templates total, ` +
      `repeating ${number} times`
  );
  performance.mark("render-start");
  for (let i = 0; i < number; i++) {
    await renderThemes(themes);
  }
  performance.mark("render-end");
  performance.measure("render", "render-start", "render-end");
}

async function main(repeat = 5) {
  for (let i = 0; i < repeat; i++) {
    parse();
  }
  for (let i = 0; i < repeat; i++) {
    await render();
  }
}

main();
