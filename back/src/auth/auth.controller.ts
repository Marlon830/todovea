import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/schemas/user.schema';
import { AuthToken } from './auth.token';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('signup')
  async signup(@Body() user: User  & { stay_connected: boolean }) {
    const createdUser = await this.userService.create(user);
    const token: AuthToken | null = await this.authService.loginUser(user.username, user.password, user.stay_connected);

    if (!token) {
      throw new Error('Error creating user');
    }
    return { createdUser, token };
  }

  @Post('login')
  async login(@Body() user: User & { stay_connected: boolean }) {
    const token: AuthToken | null = await this.authService.loginUser(user.username, user.password, user.stay_connected);

    if (!token) {
      throw new Error('Invalid username or password');
    }
    return token;
  }
}
