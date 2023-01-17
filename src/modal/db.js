const getOrder = (id) => {
  const orders = [
    {
      id: 10,
      price: 100,
    },
    {
      id: 5,
      price: 50,
    },
    {
      id: 6,
      price: 60,
    },
  ];
  const order = orders.find((order) => order.id === id);
  return order;
};

module.exports = { getOrder };
