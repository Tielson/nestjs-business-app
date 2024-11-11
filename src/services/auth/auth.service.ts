import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<User | null> {
    const user = await this.userService.findByEmail(email);
    if (user && await bcrypt.compare(pass, user.password)) {
      return user;
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.validateUser(email, pass);
    const payload = { username: user.email, sub: user.id };
    try {
      const accessToken = this.jwtService.sign(payload);
      return {
        access_token: accessToken,
      };
    } catch (error) {
      console.error('Error generating JWT:', error.message);
      throw new InternalServerErrorException('Error generating JWT');
    }
  }
}