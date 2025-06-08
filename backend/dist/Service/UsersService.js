"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const UserDto_1 = __importDefault(require("../Controller/DTO/UserDto"));
const HashPassword_1 = require("../Utils/HashPassword");
const PasswordValidation_1 = __importDefault(require("../Utils/PasswordValidation"));
class UsersService {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    async getUser(id) {
        try {
            const user = await this.prisma.user.findUnique({
                where: { id },
            });
            if (!user) {
                return { status: 'NOT_FOUND', data: 'User not found' };
            }
            const treatedResponse = UserDto_1.default.UserToBody(user);
            return { status: 'SUCCESS', data: treatedResponse };
        }
        catch (error) {
            console.error(error);
            return { status: 'ERROR', data: 'Internal error' };
        }
    }
    async getUsersList(page = 1, per_page = 10) {
        try {
            const skip = (page - 1) * per_page;
            const total = await this.prisma.user.count();
            const users = await this.prisma.user.findMany({
                skip,
                take: per_page,
                orderBy: { createdAt: 'desc' },
            });
            const treatedResponse = users.map(UserDto_1.default.UserToBody);
            const paginatedResponse = {
                page,
                per_page,
                total,
                total_pages: Math.ceil(total / per_page),
                data: treatedResponse,
            };
            return { status: 'SUCCESS', data: paginatedResponse };
        }
        catch (error) {
            console.error(error);
            return { status: 'ERROR', data: 'Internal error' };
        }
    }
    async create(user) {
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
                    password: (0, HashPassword_1.hashedPassword)(user.password),
                    avatar: user.avatar,
                },
            });
            const treatedResponse = UserDto_1.default.UserToBody(newUser);
            return { status: 'SUCCESS', data: treatedResponse };
        }
        catch (error) {
            console.error(error);
            return { status: 'ERROR', data: 'Internal error' };
        }
    }
    async update(user, id, avatar) {
        try {
            const existingUser = await this.prisma.user.findUnique({
                where: { id },
            });
            if (!existingUser) {
                return { status: 'NOT_FOUND', data: 'User not found' };
            }
            const updateData = {
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
            const treatedResponse = UserDto_1.default.UserToBody(updatedUser);
            return { status: 'SUCCESS', data: treatedResponse };
        }
        catch (error) {
            console.error(error);
            return { status: 'ERROR', data: 'Internal error' };
        }
    }
    async update_password(password, id) {
        try {
            const existingUser = await this.prisma.user.findUnique({
                where: { id },
            });
            if (!existingUser) {
                return { status: 'NOT_FOUND', data: 'User not found' };
            }
            const validatePassword = PasswordValidation_1.default.validatePassword(password.actual_password, existingUser.password);
            if (!validatePassword) {
                return { status: 'CONFLICT', data: 'Senha atual inválida' };
            }
            const updatedUser = await this.prisma.user.update({
                where: { id },
                data: {
                    password: (0, HashPassword_1.hashedPassword)(password.new_password),
                }
            });
            const treatedResponse = UserDto_1.default.UserToBody(updatedUser);
            return { status: 'SUCCESS', data: treatedResponse };
        }
        catch (error) {
            console.error(error);
            return { status: 'ERROR', data: 'Internal error' };
        }
    }
    async delete(id) {
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
        }
        catch (error) {
            console.error(error);
            return { status: 'ERROR', data: 'Internal error' };
        }
    }
}
exports.default = UsersService;
