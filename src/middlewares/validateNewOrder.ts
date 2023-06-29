import { NextFunction, Request, Response } from 'express';
import { createOrderSchema } from './schemas';

type ErrorType = { message: string };

const otherCases = (error: ErrorType) => {
  if (error.message.includes('required')) {
    return { status: 400, data: { message: error.message } };
  }
  if (error.message.includes('[') || error.message.includes('at least')) {
    return { status: 422, data: { message: '"productIds" must include only numbers' } };
  }
  return null;
};

export default (req: Request, res: Response, next: NextFunction) => {
  const { error } = createOrderSchema.validate(req.body);
  if (error) {
    const verifies = otherCases(error);
    if (verifies) return res.status(verifies.status).json(verifies.data);
    return res.status(422).json({ message: error.message });
  }

  if (typeof req.body.userId !== 'number') {
    return res.status(422).json({ message: '"userId" must be a number' });
  }
  return next();
};
