/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require("fs");
const path = require("path");

function _readFile(p) {
  try {
    return {
      path: p,
      source: fs.readFileSync(p, "utf8"),
      name: path.basename(p, path.extname(p)),
    };
  } catch (err) {
    console.error(err);
    process.exit(1);
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

function includifyThemes(themes) {
  const _themes = [];
  for (const theme of themes) {
    const layouts = [];
    for (const template of theme.templates) {
      const replacement = `{% include '${template.path}' %}`;
      layouts.push({
        source: theme.layout.source.replace(
          "{{ content_for_layout }}",
          replacement
        ),
        path: theme.layout.path,
        templateName: template.name,
      });
    }
    _themes.push({
      layout: theme.layout,
      layouts,
      templates: theme.templates,
    });
  }
  return _themes;
}

module.exports = { loadThemes, includifyThemes };
