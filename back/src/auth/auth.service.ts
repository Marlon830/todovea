import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { AuthToken } from './auth.token';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) { }

  async loginUser(username: string, password: string, stayConnected: boolean): Promise<AuthToken | null> {
    const user = await this.userService.findOneByUsername(username);

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { username: user.username, id: user.id };
      const expireTime = stayConnected ? '90d' : '24h';
      const accessToken = this.jwtService.sign(payload, { secret: process.env.JWT_SECRET ?? 'very_secret_string', expiresIn: expireTime });
      return {
        todovea_auth_token: accessToken,
        expiresIn: expireTime
      };
    }
    return null;
  }

  validateUser(token: string): boolean {
    try {
      return this.jwtService.verify(token, { secret: process.env.JWT_SECRET ?? 'very_secret_string' }) ? true : false;
    } catch (error) {
      return false;
    }
  }
}
