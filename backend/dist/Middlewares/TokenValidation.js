"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const JWTutils_1 = __importDefault(require("../Utils/JWTutils"));
class TokenValidation {
    static validateToken(req, res, next) {
        const { authorization } = req.headers;
        if (!authorization) {
            res.status(401).json({ message: 'Token not found' });
            return;
        }
        // Extrai o token do cabeçalho (formato: Bearer <token>)
        const [bearer, token] = authorization.split(' ');
        if (bearer !== 'Bearer' || !token) {
            res.status(401).json({ message: 'Token must be a valid token' });
            return;
        }
        const decoded = JWTutils_1.default.verify(token);
        if (!decoded) {
            res.status(401).json({ message: 'Invalid or expired token' });
            return;
        }
        // Adiciona o usuário ao res.locals para uso nas rotas
        res.locals.user = { id: decoded.userId };
        return next();
    }
}
exports.default = TokenValidation;
