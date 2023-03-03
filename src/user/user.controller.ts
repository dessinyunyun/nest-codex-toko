import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Body,
} from '@nestjs/common';
import { UserService } from './user.service';
import { user } from 'models';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @Get('/:id')
  getUser(@Param('id') id: string) {
    return this.userService.getUser(id);
  }

  @Post()
  createUser(@Body() payload: user) {
    console.log(payload);
    return this.userService.createUser(payload);
  }

  @Put('/:id')
  updateUser(@Body() payload: user, @Param('id') id: number) {
    return this.userService.updateUser(id, payload);
  }

  @Delete('/:id')
  deleteUser(@Param('id') id: number) {
    return this.userService.deleteUser(id);
  }
}
