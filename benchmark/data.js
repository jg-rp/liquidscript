const fs = require("fs");
const yaml = require("js-yaml");

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

module.exports = { loadData };
