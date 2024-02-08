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
import { UsersService } from './users.service';
import { Users } from './models/user.entity';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<Users[]> {
    return this.usersService.findAll();
  }

  @Post()
  @HttpCode(201)
  async create(@Body() user: Users): Promise<Users> {
    const createdUser = await this.usersService.create(user);
    return createdUser;
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() user: Users): Promise<any> {
    await this.usersService.update(id, user);
    return { message: 'User updated successfully' };
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<any> {
    const user = await this.usersService.findOne(id);

    if (!user) {
      throw new NotFoundException('User does not exist!');
    }

    await this.usersService.delete(id);
    return { message: 'User deleted successfully' };
  }
}
