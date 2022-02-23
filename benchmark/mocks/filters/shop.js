/* eslint-disable @typescript-eslint/no-var-requires */
const { errors } = require("../../../");

function assetUrl(left) {
  return `/files/1/[shop_id]/[shop_id]/assets/${left}`;
}

function globalAssetUrl(left) {
  return `/global/${left}`;
}

function shopifyAssetUrl(left) {
  return `/shopify/${left}`;
}

function scriptTag(left) {
  return `<script src="${left}" type="text/javascript"></script>`;
}

function stylesheetTag(left, media = "all") {
  return `<link href="${left}" rel="stylesheet" type="text/css"  media="${media}" />`;
}

function linkTo(left, url, title = "") {
  return _linkTo(String(left), String(url), String(title));
}

function within(left, collection) {
  return `/collections/${collection["handle"]}/${left}`;
}

function imgTag(left, alt = "") {
  return `<img src="${left}" alt="${alt}" />`;
}

function urlForVendor(left) {
  return `/collections/${toHandle(String(left))}`;
}

function urlForType(left) {
  return `/collections/${toHandle(String(left))}`;
}

function linkToVendor(left) {
  if (!left) return "Unknown Vendor";
  const url = `/collections/${toHandle(String(left))}`;
  return `<a href="${url}" title="${left}">${left}</a>`;
}

function linkToType(left) {
  if (!left) return "Unknown Type";
  const url = `/collections/${toHandle(String(left))}`;
  return `<a href="${url}" title="${left}">${left}</a>`;
}

const IMAGE_STYLES = new Set([
  "grande",
  "large",
  "medium",
  "compact",
  "small",
  "thumb",
  "icon",
]);

function productImgUrl(left, style = "small") {
  if (style === "original") return `/files/shops/random_number/${left}`;
  if (IMAGE_STYLES.has(style))
    return `/files/shops/random_number/products/${style}`;
  throw new errors.FilterArgumentError(
    `invalid product image style '${style}'`
  );
}

function defaultPagination(obj) {
  const html = [];

  if (obj["previous"]) {
    const link = _linkTo(obj["previous"]["title"], obj["previous"]["url"]);
    html.push(`<span class="prev">${link}</span>`);
  }

  for (const part of obj["parts"]) {
    if (part["is_link"]) {
      const link = _linkTo(part["title"], part["url"]);
      html.push(`<span class="page">${link}</span>`);
    } else if (part["title"] === obj["current_page"]) {
      html.push(`<span class="page current">${part.title}</span>`);
    } else {
      html.push(`<span class="deco">${part.title}</span>`);
    }
  }

  if (obj["next"]) {
    const link = _linkTo(obj["next"]["title"], obj["next"]["url"]);
    html.push(`<span class="next">${link}</span>`);
  }

  return html.join(" ");
}

function pluralize(left, singular, plural) {
  return left === 1 ? singular : plural;
}

function toHandle(s) {
  return s
    .replace(/'"\(\)\[\]/g, "")
    .split(/\s+/)
    .join("-");
}

function _linkTo(text, url, title = "") {
  return `<a href="${url}" title="${title}">${text}</a>`;
}

module.exports = {
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
};
