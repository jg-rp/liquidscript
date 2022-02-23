function weight(grams) {
  return `${Number(grams) / 1000}`;
}

function weightWithUnit(grams) {
  return `${Number(grams) / 1000} kg`;
}

module.exports = { weight, weightWithUnit };
