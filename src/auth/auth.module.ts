import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { UsersService } from 'src/users/users.service';
import { Users } from 'src/users/models/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([Users]),
    JwtModule.register({
      global: true,
      secret: process.env.SECRET,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService, UsersService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
