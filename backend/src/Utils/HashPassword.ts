import * as bcrypt from 'bcryptjs';

export const hashedPassword = (userPassword: string) => {
  
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(userPassword, salt);
  
  return hash;
}
