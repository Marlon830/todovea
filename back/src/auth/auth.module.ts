import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [JwtModule.register({ secret: process.env.JWT_TOKEN ?? 'very_secret_string' }), UserModule],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule { }
