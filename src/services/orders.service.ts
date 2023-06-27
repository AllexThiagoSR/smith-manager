import { literal } from 'sequelize';
import OrderModel, { OrderSequelizeModel } from '../database/models/order.model';
import ProductModel from '../database/models/product.model';
import ServiceReturn from '../types/ServiceReturn';

const getAll = async (): Promise<ServiceReturn<OrderSequelizeModel[]>> => {
  try {
    const orders = await OrderModel.findAll({ 
      include: { model: ProductModel, as: 'products', attributes: [] },
      attributes: [
        'id',
        'userId',
        [literal('JSON_ARRAYAGG(products.id)'), 'productIds'],
      ],
      group: ['Order.id'],
    });
    return { status: 200, data: orders };
  } catch (error) {
    return { status: 500, data: { message: 'Internal server error' } };
  }
};

export default { getAll };
