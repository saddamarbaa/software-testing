const sum = (a, b) => a + b;

const greeting = (name) => `Hello ${name}!`;

const isEven = (number) => (number % 2 === 0 ? true : false);

const getShoppingList = () => ['diapers', 'kleenex', 'trash bags', 'paper towels', 'milk'];

module.exports = { sum, greeting, isEven, getShoppingList };
