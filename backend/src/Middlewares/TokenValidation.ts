import { Request, Response, NextFunction } from 'express';
import JwtUtils from '../Utils/JWTutils';

export default class TokenValidation {
  public static validateToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
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

    const decoded = JwtUtils.verify(token);

    if (!decoded) {
      res.status(401).json({ message: 'Invalid or expired token' });
      return;
    }

    // Adiciona o usuário ao res.locals para uso nas rotas
    res.locals.user = { id: decoded.userId };
    return next();
  }
}