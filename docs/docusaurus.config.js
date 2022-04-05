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
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl: "https://github.com/jg-rp/liquidscript/tree/docs",
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
            to: "docs/api/",
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
        copyright: `Copyright © ${new Date().getFullYear()} James Prior. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
