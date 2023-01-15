const sum = (a, b) => a + b;

const greeting = (name) => `Hello ${name}!`;

const isEven = (number) => (number % 2 === 0 ? true : false);

const getShoppingList = () => ['diapers', 'kleenex', 'trash bags', 'paper towels', 'milk'];

const getOrderById = (id) => {
  if (!id) throw new Error('id is not defined');
  return { id: id, price: 10, name: 'Book' };
};

module.exports = { sum, greeting, isEven, getShoppingList, getOrderById };
