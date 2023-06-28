import { literal } from 'sequelize';
import OrderModel, { OrderSequelizeModel } from '../database/models/order.model';
import ProductModel from '../database/models/product.model';
import ServiceReturn from '../types/ServiceReturn';
import UserModel from '../database/models/user.model';

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

// const getOrder = async (id: number) => {};

type NewOrderReturn = {
  userId: number,
  productIds: number[],
};

const create = async (
  userId: number,
  productIds: number[],
): Promise<ServiceReturn<NewOrderReturn>> => {
  try {
    const user = await UserModel.findByPk(userId);
    if (!user) {
      return { status: 404, data: { message: '"userId" not found' } };
    }
    const products = await ProductModel.findAll({ where: { id: productIds } });
    if (products.length !== productIds.length) {
      return { status: 404, data: { message: 'Some product not found' } };
    }
    await OrderModel.create({ userId });
    return { status: 201, data: { userId, productIds } };
  } catch (error) {
    return { status: 500, data: { message: 'Internal server error' } };
  }
};

export default { getAll, create };
