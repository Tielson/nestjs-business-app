import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from '@services/auth/auth.service';
import { AuthController } from 'src/controllers/auth/auth.controller';
import { JwtStrategy } from 'src/utils/jwt.strategy';
import { LocalStrategy } from 'src/utils/local.strategy';
import { UserModule } from './user.module';

@Module({
  imports: [
    forwardRef(() => UserModule), // Usar forwardRef para evitar dependência circular
    PassportModule.register({ defaultStrategy: 'jwt' }), // Registrar a estratégia JWT
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '60m' },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService], // Certifique-se de exportar o AuthService se necessário
})
export class AuthModule {}