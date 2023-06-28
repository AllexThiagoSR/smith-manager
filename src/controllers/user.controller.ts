import { Response, Request } from 'express';
import userService from '../services/user.service';

const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const { status, data } = await userService.login(username, password);
  return res.status(status).json(data);
};

export default { login };
