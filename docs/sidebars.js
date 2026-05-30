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
      label: "Docs",
      collapsed: false,
      items: [
        "intro",
        "environment",
        "loaders",
        "data-types-and-drops",
        "undefined",
        "static-analysis",
        "guides/custom-filters",
        "guides/custom-tags",
        "syntax",
      ],
    },
  ],
  referenceSidebar: [
    {
      type: "category",
      label: "Reference",
      collapsed: false,
      items: ["reference/filters", "reference/tags", "reference/extra-tags"],
    },
  ],
  API: [
    {
      type: "category",
      label: "API",
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
