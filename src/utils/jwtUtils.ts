import jwt, { SignOptions } from 'jsonwebtoken';

type Payload = { id: number, username: string };

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

const jwtConfig: SignOptions = { expiresIn: '2d' };

export const createToken = (payload: Payload): string => jwt.sign(payload, JWT_SECRET, jwtConfig);

export const decode = (token: string): Payload => jwt.verify(token, JWT_SECRET) as Payload;
