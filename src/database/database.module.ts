import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../users/models/user.entity';
import dotenv from 'dotenv';
import { Movies } from 'src/movies/models/movie.entity';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_URL,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASS,
      database: 'kinopoisk',
      entities: [Users, Movies],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
