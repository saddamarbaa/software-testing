const { default: axios } = require('axios');
const db = require('../modal/db');

const sum = (a, b) => a + b;

const greeting = (name) => `Hello ${name}!`;

const isEven = (number) => (number % 2 === 0 ? true : false);

const getShoppingList = () => ['diapers', 'kleenex', 'trash bags', 'paper towels', 'milk'];

const getOrderById = (id) => {
  if (!id) throw new Error('id is not defined');
  return { id: id, price: 10, name: 'Book' };
};

const applyDiscount = (id) => {
  const order = db.getOrder(id);

  if (order.price >= 10) {
    order.price = order.price * 0.1;
  }

  return order;
};
const getOrders = async () => {
  const result = [
    {
      id: 10,
      price: 10,
    },
    {
      id: 1,
      price: 11,
    },
    {
      id: 81,
      price: 181,
    },
  ];
  return new Promise(function (resolve, reject) {
    setTimeout(() => resolve(result), 1000);
  });
};

const fetchData = async () => {
  const data = await axios.get('https/url.com');

  // do some logic
  return data;
};

module.exports = { sum, greeting, isEven, getShoppingList, getOrderById, fetchData, getOrders, applyDiscount };
