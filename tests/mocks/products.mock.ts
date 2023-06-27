const productWithouName = { price: '30 peças de ouro', orderId: 4 };

const productWithEmptyName = { name: '', price: '30 peças de ouro', orderId: 4 };

const productWithouPrice = { name: 'Martelo do Thor', orderId: 4 };

const productWithEmptyPrice = { name: 'Martelo do Thor', price: '', orderId: 4 };

const productWithouOrderId = { name: 'Martelo do Thor', price: '30 peças de ouro' };

const newProduct = { name: 'Martelo do Thor', price: '30 peças de ouro', orderId:4 }

const productsList = [
  {
    id: 1,
    name: "Excalibur",
    price: "10 peças de ouro",
    orderId: 1
  },
  {
    id: 2,
    name: "Espada Justiceira",
    price: "20 peças de ouro",
    orderId: 1
  },
  {
    id: 3,
    name: "Lira de Orfeu",
    price: "1 peça de ouro",
    orderId: 2
  },
  {
    id: 4,
    name: "Armadura de Aquiles",
    price: "1 peça de ouro",
    orderId: 2
  },
  {
    id: 5,
    name: "Harpa de Dagda",
    price: "15 peças de ouro",
    orderId: 3
  },
  {
    id: 6,
    name: "Arco Escudo Invejável",
    price: "3 Gemas da Noite",
    orderId: 4
  }
];

export default { productWithouName, productsList, newProduct, productWithEmptyName, productWithouPrice, productWithEmptyPrice, productWithouOrderId };
