import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UserService } from '@services/user/user.service';
import { CreateUserDto, UpdateUserDto } from '../../dtos/users/user.dto';
import { AuthGuard } from '../../guards/AuthGuard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  @UseGuards(AuthGuard)
  async findAll() {
    return await this.userService.findAll();
  }

  @Get('id')
  @UseGuards(AuthGuard)
  async findById(@Param() id: string) {
    return await this.userService.findById(id);
  }

  @Get('email')
  @UseGuards(AuthGuard)
  async findByEmail(@Body('email') email: string) {
    return await this.userService.findByEmail(email);
  }

  @Post()
  @UseGuards(AuthGuard)
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Put()
  @UseGuards(AuthGuard)
  async update(@Param() id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async remove(@Param() id: string) {
    return await this.userService.remove(id);
  }
}