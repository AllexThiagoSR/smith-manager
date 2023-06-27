import ProductModel,
{ ProductInputtableTypes, ProductSequelizeModel } from '../database/models/product.model';
import ServiceReturn from '../types/ServiceReturn';

const INTERNAL_SERVER_ERROR: ServiceReturn<ProductSequelizeModel[]> = { 
  status: 500, 
  data: { message: 'Internal server error' }, 
};

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

const getAll = async (): Promise<ServiceReturn<ProductSequelizeModel[]>> => {
  try {
    const products = await ProductModel.findAll();
    return { status: 200, data: products };
  } catch (error) {
    return INTERNAL_SERVER_ERROR;
  }
};

export default { create, getAll };
