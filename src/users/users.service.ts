import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Response } from 'express';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findOne(username: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({ username });

    if (!user) {
      throw new NotFoundException('No user with that username');
    }

    return user;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.usersRepository.create(createUserDto);

    return await this.usersRepository.save(user);
  }

  async updateOne(
    username: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const user = await this.findOne(username);

    Object.assign(user, updateUserDto);

    return await this.usersRepository.save(user);
  }

  async deleteOne(username: string, res: Response): Promise<void> {
    const user = await this.findOne(username);

    await this.usersRepository.delete(user.id);

    res.clearCookie('jwt', { expires: new Date(Date.now() - 10000000) });
  }
}
