
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService
  ) { }

  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    try {
      const token = authHeader.split(' ')[1];
      const payload = this.jwtService.verify(token, { secret: process.env.JWT_SECRET ?? 'very_secret_string' });
      if (payload) {
        req['userId'] = payload.id;
        return next();
      }
    } catch (error) {
      return res.status(401).json({ message: 'Unauthorized: Token invalid or expired' });
    }
  }
}
