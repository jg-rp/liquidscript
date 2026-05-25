// @ts-check

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.

 @type {import('@docusaurus/plugin-content-docs').SidebarsConfig}
 */
const sidebars = {
  docsSidebar: [
    {
      type: "category",
      label: "Getting Started",
      collapsed: false,
      items: ["intro", "environment", "context-data", "loaders"],
    },
    {
      type: "category",
      label: "Guides",
      collapsed: false,
      items: ["guides/custom-filters", "guides/custom-tags"],
    },
  ],
  API: [
    {
      type: "category",
      label: "Typedoc API",
      link: {
        type: "doc",
        id: "api/index",
      },
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      items: require("./docs/api/typedoc-sidebar.cjs"),
    },
  ],
};

export default sidebars;
