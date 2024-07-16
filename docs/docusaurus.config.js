// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from "prism-react-renderer";

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "LiquidScript",
  tagline: "Liquid Templates for JavaScript",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://jg-rp.github.io/",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/liquidscript/",
  trailingSlash: false,

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "jg-rp", // Usually your GitHub org/user name.
  projectName: "liquidscript", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  markdown: {
    format: "detect",
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: "/",
          sidebarPath: "./sidebars.js",
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/jg-rp/liquidscript/tree/docs",
        },
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
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
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
      algolia: {
        appId: "F84WNQYWWH",
        apiKey: "0547ea5c65f71a80ddbfb1124f55f6c1",
        indexName: "liquidscript",
        contextualSearch: false,
      },
    }),
};

export default config;
