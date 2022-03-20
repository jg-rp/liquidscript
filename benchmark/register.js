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
const { CommentFormTag } = require("./mocks/tags/comment_form");
const { PaginateTag } = require("./mocks/tags/paginate");

function registerMocks(env) {
  env.filters.json = json;
  env.filters.money = money;
  env.filters.money_with_currency = moneyWithCurrency;
  env.filters.asset_url = assetUrl;
  env.filters.default_pagination = defaultPagination;
  env.filters.global_asset_url = globalAssetUrl;
  env.filters.img_tag = imgTag;
  env.filters.link_to = linkTo;
  env.filters.link_to_type = linkToType;
  env.filters.link_to_vendor = linkToVendor;
  env.filters.shopify_asset_url = shopifyAssetUrl;
  env.filters.stylesheet_tag = stylesheetTag;
  env.filters.script_tag = scriptTag;
  env.filters.url_for_type = urlForType;
  env.filters.url_for_vendor = urlForVendor;
  env.filters.product_img_url = productImgUrl;
  env.filters.pluralize = pluralize;
  env.filters.highlight_active_tag = highlighActiveTag;
  env.filters.link_to_add_tag = linkToAddTag;
  env.filters.link_to_remove_tag = linkToRemoveTag;
  env.filters.link_to_tag = linkToTag;
  env.filters.weight = weight;
  env.filters.weight_with_unit = weightWithUnit;
  env.filters.within = within;

  env.tags.form = CommentFormTag;
  env.tags.paginate = PaginateTag;
}

module.exports = { registerMocks };
