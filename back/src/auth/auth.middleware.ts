
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from './auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) { }

  use(req: Request, res: Response, next: NextFunction) {
    const cookieName = process.env.COOKIE_NAME ?? 'auth_token';

    if (req.cookies &&
      req.cookies[cookieName] &&
      this.authService.validateUser(req.cookies[cookieName])) {
      return next();
    }
    return res.status(401).send({ message: 'Unauthorized' });
  }
}
