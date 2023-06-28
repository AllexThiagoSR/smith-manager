import bcrypt from 'bcryptjs';

const SALT_ROUNDS = process.env.BCRYPT_SALT_ROUNDS || 10;

export function incodePassword(password: string): string { 
  return bcrypt.hashSync(password, SALT_ROUNDS); 
}

export function compare(password: string, encodedPassword: string): boolean {
  return bcrypt.compareSync(password, encodedPassword);
}
