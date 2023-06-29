import { NextFunction, Request, Response } from 'express';
import { decode } from '../utils/jwtUtils';

export default (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) { 
      return res.status(401).json({ message: 'Token not found' }); 
    }
    const arrayWithToken = authorization.split(' ');
    const decoded = decode(arrayWithToken[arrayWithToken.length - 1] as string);
    res.locals = { ...res.locals, user: decoded };
    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
