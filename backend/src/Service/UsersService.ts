import { PrismaClient } from '@prisma/client';
import UserDto from '../Controller/DTO/UserDto';
import { IPaginatedResponse, IPassword_Change, IResponseUser, IUser } from '../Types';
import { hashedPassword } from '../Utils/HashPassword';
import PasswordValidation from '../Utils/PasswordValidation';

export default class UsersService {
  private prisma = new PrismaClient();

  public async getUser(id: number): Promise<{ status: string; data: IResponseUser | string }> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id },
      });

      if (!user) {
        return { status: 'NOT_FOUND', data: 'User not found' };
      }

      const treatedResponse = UserDto.UserToBody(user);

      return { status: 'SUCCESS', data: treatedResponse };
    } catch (error) {
      console.error(error);
      return { status: 'ERROR', data: 'Internal error' };
    }
  }

  public async getUsersList(page = 1, per_page = 10): Promise<{ status: string; data: IPaginatedResponse<IResponseUser[]> | string }> {
    try {
      const skip = (page - 1) * per_page;
      const total = await this.prisma.user.count();
      const users = await this.prisma.user.findMany({
        skip,
        take: per_page,
        orderBy: { createdAt: 'desc' },
      });

      const treatedResponse = users.map(UserDto.UserToBody);

      const paginatedResponse: IPaginatedResponse<IResponseUser[]> = {
        page,
        per_page,
        total,
        total_pages: Math.ceil(total / per_page),
        data: treatedResponse,
      };

      return { status: 'SUCCESS', data: paginatedResponse };
    } catch (error) {
      console.error(error);
      return { status: 'ERROR', data: 'Internal error' };
    }
  }

  public async create(user: IUser): Promise<{ status: string; data: IResponseUser | string }> {
    try {
      const existingUser = await this.prisma.user.findUnique({
        where: { email: user.email },
      });

      if (existingUser) {
        return { status: 'CONFLICT', data: 'User already exists' };
      }

      const newUser = await this.prisma.user.create({
        data: {
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          password: hashedPassword(user.password),
          avatar: user.avatar,
        },
      });

      const treatedResponse = UserDto.UserToBody(newUser);

      return { status: 'SUCCESS', data: treatedResponse };
    } catch (error) {
      console.error(error);
      return { status: 'ERROR', data: 'Internal error' };
    }
  }

  public async update(user: IUser, id: number, avatar?: Express.Multer.File): Promise<{ status: string; data: IResponseUser | string }> {
    try {
      const existingUser = await this.prisma.user.findUnique({
        where: { id },
      });

      if (!existingUser) {
        return { status: 'NOT_FOUND', data: 'User not found' };
      }

      const updateData: any = {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
      };

      if (avatar) {
        updateData.avatar = avatar.buffer.toString('base64');
        updateData.avatar_mimetype = avatar.mimetype;
      }
      const updatedUser = await this.prisma.user.update({
        where: { id },
        data: updateData,
      });

      const treatedResponse = UserDto.UserToBody(updatedUser);

      return { status: 'SUCCESS', data: treatedResponse };
    } catch (error) {
      console.error(error);
      return { status: 'ERROR', data: 'Internal error' };
    }
  }

  public async update_password(password: IPassword_Change, id: number): Promise<{ status: string; data: IResponseUser | string }> {
    try {
      const existingUser = await this.prisma.user.findUnique({
        where: { id },
      });

      if (!existingUser) {
        return { status: 'NOT_FOUND', data: 'User not found' };
      }

      const validatePassword = PasswordValidation.validatePassword(password.actual_password, existingUser.password);
      
      if (!validatePassword) {
        return { status: 'CONFLICT', data: 'Senha atual inválida' };
      }

      const updatedUser = await this.prisma.user.update({
        where: { id },
        data: {
          password: hashedPassword(password.new_password),
        }
      });

      const treatedResponse = UserDto.UserToBody(updatedUser);

      return { status: 'SUCCESS', data: treatedResponse };
    } catch (error) {
      console.error(error);
      return { status: 'ERROR', data: 'Internal error' };
    }
  }


  public async delete(id: number): Promise<{ status: string; data: string }> {
    try {
      const existingUser = await this.prisma.user.findUnique({
        where: { id },
      });

      if (!existingUser) {
        return { status: 'NOT_FOUND', data: 'User not found' };
      }

      await this.prisma.user.delete({
        where: { id },
      });

      return { status: 'SUCCESS', data: 'User deleted' };
    } catch (error) {
      console.error(error);
      return { status: 'ERROR', data: 'Internal error' };
    }
  }
}