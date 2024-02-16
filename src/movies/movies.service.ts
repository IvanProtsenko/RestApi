import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movies } from './models/movie.entity';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movies)
    private movieRepository: Repository<Movies>
  ) {}

  async findAll(): Promise<Movies[]> {
    return this.movieRepository.find();
  }

  async findOne(id: number): Promise<Movies> {
    return this.movieRepository.findOne({ where: { id } });
  }

  async create(user: Partial<Movies>): Promise<Movies> {
    const newuser = this.movieRepository.create(user);
    return this.movieRepository.save(newuser);
  }

  async update(id: number, user: Partial<Movies>): Promise<Movies> {
    await this.movieRepository.update(id, user);
    return this.movieRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.movieRepository.delete(id);
  }
}
