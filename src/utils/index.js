function sum(a, b) {
  return a + b;
}

function greeting(name) {
  return `Hello ${name}!`;
}

function isEven(number) {
  return number % 2 === 0 ? true : false;
}
module.exports = { sum, greeting, isEven };
