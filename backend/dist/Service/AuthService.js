"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const JWTutils_1 = __importDefault(require("../Utils/JWTutils"));
const PasswordValidation_1 = __importDefault(require("../Utils/PasswordValidation"));
class AuthService {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    async login(user) {
        try {
            const findUser = await this.prisma.user.findUnique({
                where: { email: user.email },
            });
            const validUser = findUser;
            if (validUser) {
                const passwordValidation = PasswordValidation_1.default.validatePassword(user.password, validUser.password);
                const tokenGenerated = JWTutils_1.default.sign(validUser.id);
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
        }
        catch (error) {
            console.error(error);
            return { status: 'ERROR', data: 'Internal error' };
        }
    }
}
exports.default = AuthService;
