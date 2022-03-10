const { Loader, TemplateSource, errors } = require("../../");

class MockMapLoader extends Loader {
  constructor(map, ms) {
    super();
    this._map = map === undefined ? new Map() : map;
    this.ms = ms || 80;
  }

  async getSource(name) {
    // async IO simulation
    const [source] = await Promise.all([
      this._getSource(name),
      timeout(this.ms),
    ]);
    return source;
  }

  getSourceSync(name) {
    wait(this.ms); // blocking IO simulation
    return this._getSource(name);
  }

  _getSource(name) {
    if (!this._map.has(name)) throw new errors.TemplateNotFoundError(name);
    return new TemplateSource(this._map.get(name), name);
  }
}

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function wait(ms) {
  const start = new Date().getTime();
  let end = start;
  while (end < start + ms) {
    end = new Date().getTime();
  }
}

module.exports = { MockMapLoader };
