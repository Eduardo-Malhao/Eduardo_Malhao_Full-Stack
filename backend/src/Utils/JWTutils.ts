import * as jwt from 'jsonwebtoken';
import type { Secret, SignOptions } from 'jsonwebtoken';

export default class JwtUtils {
  private static readonly jwtSecret: Secret = 'secret';
  private static readonly defaultExpiresIn = '1h';

  static sign(userId: number): string {
    const payload = { userId };
    const options: SignOptions = {
      expiresIn: JwtUtils.defaultExpiresIn // Sem type assertion
    };
    
    return jwt.sign(
      payload,
      JwtUtils.jwtSecret,
      options
    );
  }

  static verify(token: string): { userId: number } | null {
    try {
      const decoded = jwt.verify(token, JwtUtils.jwtSecret) as jwt.JwtPayload & { userId: number };
      return { userId: decoded.userId };
    } catch (error) {
      console.error('JWT verification failed:', error);
      return null;
    }
  }
}