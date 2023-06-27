import { Request, Response } from 'express';
import productService from '../services/product.service';

const create = async (req: Request, res: Response) => {
  const { status, data } = await productService.create(req.body);
  return res.status(status).json(data);
};

const getAll = async (req: Request, res: Response) => {
  const { status, data } = await productService.getAll();
  return res.status(status).json(data);
};

export default { create, getAll };
