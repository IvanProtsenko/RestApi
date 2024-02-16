import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './models/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>
  ) {}

  async findAll(): Promise<Users[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<Users> {
    return this.userRepository.findOne({ where: { id } });
  }

  async findOneByName(first_name: string): Promise<Users> {
    return this.userRepository.findOne({ where: { first_name } });
  }

  async create(user: Partial<Users>): Promise<Users> {
    const newuser = this.userRepository.create(user);
    return this.userRepository.save(newuser);
  }

  async update(id: number, user: Partial<Users>): Promise<Users> {
    await this.userRepository.update(id, user);
    return this.userRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
