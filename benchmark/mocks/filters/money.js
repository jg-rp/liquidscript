function moneyWithCurrency(left) {
  return `$ ${Number(left) / 100.0} USD`;
}

function money(left) {
  return `$ ${Number(left) / 100.0}`;
}

module.exports = {
  money,
  moneyWithCurrency,
};
