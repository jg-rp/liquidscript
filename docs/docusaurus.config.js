// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/vsDark");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "LiquidScript",
  tagline: "Liquid Templates for JavaScript and TypeScript",
  url: "https://jg-rp.github.io/",
  baseUrl: "/liquidscript/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  organizationName: "jg-rp", // Usually your GitHub org/user name.
  projectName: "liquidscript", // Usually your repo name.
  trailingSlash: false,

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          editUrl: "https://github.com/jg-rp/liquidscript/tree/docs",
          routeBasePath: "/",
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl: "https://github.com/jg-rp/liquidscript/tree/blog",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
        sitemap: {
          changefreq: "weekly",
          priority: 0.5,
        },
      }),
    ],
  ],

  plugins: [
    [
      "docusaurus-plugin-typedoc",
      {
        entryPoints: ["../src/liquidscript.ts"],
        tsconfig: "../tsconfig.json",
        readme: "docs/README_API.md",
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: "LiquidScript",
        logo: {
          alt: "LiquidScript",
          src: "img/logo-128.svg",
          srcDark: "img/logo-dark-128.svg",
        },
        items: [
          {
            type: "doc",
            docId: "introduction/getting-started",
            position: "left",
            label: "Docs",
          },
          {
            type: "doc",
            docId: "language/filters",
            position: "left",
            label: "Filters",
          },
          {
            type: "doc",
            docId: "language/tags",
            position: "left",
            label: "Tags",
          },
          {
            to: "/api/",
            label: "API",
            position: "left",
          },
          // {to: '/blog', label: 'Blog', position: 'right'},
          {
            href: "https://github.com/jg-rp/liquidscript/",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Docs",
            items: [
              {
                label: "Introduction",
                to: "/introduction/getting-started",
              },
              {
                label: "Installation",
                to: "/introduction/getting-started#install",
              },
              {
                label: "Filter Reference",
                to: "/language/filters",
              },
              {
                label: "Tag Reference",
                to: "/language/tags",
              },
            ],
          },
          {
            title: "Features",
            items: [
              {
                label: "HTML Auto-Escape",
                to: "/introduction/auto-escape",
              },
              {
                label: "Static Template Analysis",
                to: "/guides/static-analysis",
              },
              {
                label: "Resource Limits",
                to: "/guides/resource-limits",
              },
            ],
          },
          {
            title: "Links",
            items: [
              {
                label: "GitHub",
                href: "https://github.com/jg-rp/liquidscript",
              },
              {
                label: "Change Log",
                href: "https://github.com/jg-rp/liquidscript/blob/main/CHANGELOG.md",
              },
              {
                label: "NPM",
                href: "https://www.npmjs.com/package/liquidscript",
              },
            ],
          },
          {
            title: "Related Projects",
            items: [
              {
                label: "Python Liquid",
                href: "https://github.com/jg-rp/liquid",
              },
              {
                label: "Golden Liquid",
                href: "https://github.com/jg-rp/golden-liquid",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} James Prior. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      algolia: {
        appId: "F84WNQYWWH",
        apiKey: "0547ea5c65f71a80ddbfb1124f55f6c1",
        indexName: "liquidscript",
        contextualSearch: false,
      },
    }),
};

module.exports = config;
