import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  NotFoundException,
  HttpCode,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movies } from './models/movie.entity';

@Controller('api/movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  async findAll(): Promise<Movies[]> {
    return this.moviesService.findAll();
  }

  @Post()
  @HttpCode(201)
  async create(
    @Body() user: Omit<Movies, 'created_at' | 'id'>
  ): Promise<Movies> {
    const createdUser = await this.moviesService.create(user);
    return createdUser;
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() user: Movies): Promise<any> {
    await this.moviesService.update(id, user);
    return { message: 'Movie updated successfully' };
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<any> {
    const user = await this.moviesService.findOne(id);

    if (!user) {
      throw new NotFoundException('Movie does not exist!');
    }

    await this.moviesService.delete(id);
    return { message: 'Movie deleted successfully' };
  }
}
