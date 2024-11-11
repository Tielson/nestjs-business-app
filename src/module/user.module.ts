import { Module, forwardRef } from '@nestjs/common';
import { UserService } from '@services/user/user.service';
import { UserController } from 'src/controllers/user/user.controller';
import { JwtStrategy } from 'src/utils/jwt.strategy';
import { AuthModule } from './auth.module';
import { PrismaModule } from './prisma.module';

@Module({
  imports: [
    PrismaModule,
    forwardRef(() => AuthModule), // Usar forwardRef para evitar dependência circular
  ],
  providers: [UserService, JwtStrategy],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}