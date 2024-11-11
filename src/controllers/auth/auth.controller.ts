import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '@services/auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  async login(@Body() { email, password }) {
    return this.authService.signIn(email, password);
  }
}