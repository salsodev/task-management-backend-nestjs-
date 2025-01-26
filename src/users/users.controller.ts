import { Controller, Delete, Get, Param, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAllUsers() {
    return this.usersService.findAll();
  }

  @Get(':username')
  getUser(@Param('username') username: string) {
    return this.usersService.findOne(username);
  }

  @Delete(':username')
  delete(@Param('username') username: string, @Res() res: Response) {
    return this.usersService.deleteOne(username, res);
  }
}
