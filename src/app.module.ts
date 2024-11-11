import { AuthModule } from '@module/auth.module';
import { PrismaModule } from '@module/prisma.module';
import { UserModule } from '@module/user.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}