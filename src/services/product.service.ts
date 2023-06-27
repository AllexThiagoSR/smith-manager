import ProductModel,
{ ProductInputtableTypes, ProductSequelizeModel } from '../database/models/product.model';
import ServiceReturn from '../types/ServiceReturn';

const create = async (
  productInfo: ProductInputtableTypes,
): Promise<ServiceReturn<ProductSequelizeModel>> => {
  try {
    const product = await ProductModel.create(productInfo);
    return { status: 201, data: product };
  } catch (error) {
    return { status: 500, data: { message: 'Internal server error' } };
  }
};

export default { create };
