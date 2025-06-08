import { PrismaClient } from '@prisma/client';
import JwtUtils from '../Utils/JWTutils';
import PasswordValidation from '../Utils/PasswordValidation';

import { IAuth, IReponseLogin } from '../Types';

export default class AuthService {
  private prisma = new PrismaClient();

  public async login(user: IAuth): Promise<{ status: string; data: string | IReponseLogin }> {
    try {
      const findUser = await this.prisma.user.findUnique({
        where: { email: user.email },
      });

      const validUser = findUser;
      if (validUser) {
        const passwordValidation = PasswordValidation.validatePassword(user.password, validUser.password);

        const tokenGenerated = JwtUtils.sign(validUser.id);

        if (passwordValidation) {
          return {
            status: 'SUCCESS',
            data: {
              token: tokenGenerated,
              id: validUser.id,
              email: validUser.email,
              first_name: validUser.first_name,
              last_name: validUser.last_name,
              avatar: validUser.avatar ?? null,
            }
          };
        }
      }

      return { status: 'NOT_FOUND', data: 'Invalid email or password' };

    } catch (error) {
      console.error(error);
      return { status: 'ERROR', data: 'Internal error' };
    }
  }
}
