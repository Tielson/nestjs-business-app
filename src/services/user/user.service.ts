import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from 'src/controllers/user/user.dto';

@Injectable()
export class UserService {
  findAll() {
    throw new Error('Method not implemented.');
  }

  findOne(id: string) {
    throw new Error('Method not implemented.');
  }

  create(createUserDto: CreateUserDto) {
    throw new Error('Method not implemented.');
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    throw new Error('Method not implemented.');
  }

  remove(id: string) {
    throw new Error('Method not implemented.');
  }
}
