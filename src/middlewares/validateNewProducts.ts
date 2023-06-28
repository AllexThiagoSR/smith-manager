import { Request, Response, NextFunction } from 'express';
import schemas from './schemas';

const validateProduct = (req: Request, res: Response, next: NextFunction) => {
  const { error } = schemas.createProductSchema.validate(req.body);
  
  if (error) {
    const statusCode = error.message.includes('required') ? 400 : 422;
    return res.status(statusCode).json({ message: error.message }); 
  }
  return next();
};

export default validateProduct;
