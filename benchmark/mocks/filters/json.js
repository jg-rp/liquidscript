const { FilterArgumentError } = require("../../../");
const { object } = require("../../../");

/**
 *
 * @param this
 * @param left
 * @returns
 */
function json(left) {
  if (!object.isObject(left))
    throw new FilterArgumentError(`expected an object, found ${typeof left}`);
  return JSON.stringify(left);
}

module.exports = { json };
