const productWithouName = { price: '30 peças de ouro', orderId: 4 };

const productWithEmptyName = { name: '', price: '30 peças de ouro', orderId: 4 };

const productWithouPrice = { name: 'Martelo do Thor', orderId: 4 };

const productWithEmptyPrice = { name: 'Martelo do Thor', price: '', orderId: 4 };

const productWithouOrderId = { name: 'Martelo do Thor', price: '30 peças de ouro' };

const newProduct = { name: 'Martelo do Thor', price: '30 peças de ouro', orderId:4 }

export default { productWithouName, newProduct, productWithEmptyName, productWithouPrice, productWithEmptyPrice, productWithouOrderId };
