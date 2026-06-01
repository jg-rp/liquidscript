// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from "prism-react-renderer";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "LiquidScript",
  tagline: "Liquid Templates for JavaScript",
  favicon: "img/favicon.ico",

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

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

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
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
      }),
    ],
  ],

  plugins: [
    [
      "docusaurus-plugin-typedoc",
      {
        entryPoints: ["../src/liquidscript.ts"],
        tsconfig: "../tsconfig.build.json",
        readme: "docs/README_API.md",
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: "LiquidScript",
        logo: {
          alt: "LiquidScript",
          src: "img/liquidscript_logo.png",
        },
        items: [
          {
            type: "docSidebar",
            sidebarId: "docsSidebar",
            position: "left",
            label: "Docs",
          },
          {
            type: "doc",
            docId: "reference/filters",
            position: "left",
            label: "Filters",
          },
          {
            type: "doc",
            docId: "reference/tags",
            position: "left",
            label: "Tags",
          },
          {
            to: "/api/",
            label: "API",
            position: "left",
          },
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
                to: "/",
              },
              {
                label: "Installation",
                to: "/#install",
              },
              {
                label: "Filter Reference",
                to: "/reference/filters",
              },
              {
                label: "Tag Reference",
                to: "/reference/tags",
              },
            ],
          },
          {
            title: "Guides",
            items: [
              {
                label: "Custom filters",
                to: "/guides/custom-filters",
              },
              {
                label: "Custom tags",
                to: "/guides/custom-tags",
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
        ],
        copyright: `Copyright © ${new Date().getFullYear()} James Prior. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ["bash"],
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
