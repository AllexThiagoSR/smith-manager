import { Response, Request } from 'express';
import ordersService from '../services/orders.service';

const getAll = async (_req:Request, res: Response) => {
  const { status, data } = await ordersService.getAll();
  return res.status(status).json(data);
};

const create = async (req: Request, res: Response) => {
  const { status, data } = await ordersService.create(req.body.userId, req.body.productIds);
  console.log(req.headers.authorization);
  
  return res.status(status).json(data);
};

export default { getAll, create };
