import { Request, Response, NextFunction } from 'express';
import schemas from './schemas';

const validateProduct = (req: Request, res: Response, next: NextFunction) => {
  const { error } = schemas.createProductSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.message });
  return next();
};

export default validateProduct;
