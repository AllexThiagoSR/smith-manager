import { incodePassword } from "../../src/utils/bcryptUtils";

export const loginWithoutUsername = {
  password: 'senhaSecreta',
};

export const loginWithoutPassword = {
  username: 'User',
};

export const successfullLogin = {
  username: 'User',
  password: 'senhaSecreta'
};

export const incorrectPassword = {
  username: 'User',
  password: 'senhaSeceta'
};

export const loggedUser = {
  id: 1,
  username: 'User',
  password: incodePassword('senhaSecreta'),
  vocation: 'cantor',
  level: 150,
};
