import { compare } from '../utils/bcryptUtils';
import UserModel from '../database/models/user.model';
import ServiceReturn from '../types/ServiceReturn';
import { createToken } from '../utils/jwtUtils';

type LoginReturn = { token: string };

const INTERNAL_SERVER_ERROR: ServiceReturn<LoginReturn> = { 
  status: 500, 
  data: { message: 'Internal server error' }, 
};

const login = async (username: string, password: string): Promise<ServiceReturn<LoginReturn>> => {
  try {
    const user = await UserModel.findOne({ where: { username } });
    if (!user || !compare(password, user.dataValues.password)) {
      return { status: 401, data: { message: 'Username or password invalid' } };
    }
    const token = createToken({ 
      id: user.dataValues.id, username: user.dataValues.username,
    });
    return { status: 200, data: { token } };
  } catch (error) {
    return INTERNAL_SERVER_ERROR;
  }
};

export default { login };
