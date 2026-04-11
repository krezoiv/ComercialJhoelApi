import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './login/presentation/controller/auth.controller';
import { PrismaService } from 'src/shared/database/prisma.service';
import { SpExecutorService } from 'src/shared/database/sp-executor.service';
import { PrismaAuthRepository } from './login/infrastructure/prisma/prisma-auth.repository';
import { LoginUserSp } from './login/infrastructure/stored-procedure/login-user.sp';
import { LoginHandler } from './login/application/commands/login.handler';
import { JwtStrategy } from './login/infrastructure/strategies/jwt.strategy';

import { AbilityFactory } from 'src/shared/auth/index-shared -auth';

const CommandHandler = [LoginHandler];
@Module({
  imports: [
    CqrsModule,
    JwtModule.register({
      secret: 'SUPER_SECRET_KEY', // luego .env
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    PrismaService,
    JwtStrategy,
    SpExecutorService,
    LoginUserSp,
    ...CommandHandler,
    {
      provide: 'AuthRepository',
      useClass: PrismaAuthRepository,
    },
    AbilityFactory, // ✅ AGREGAR
  ],
  exports: [
    AbilityFactory, // 🔥 CRÍTICO
  ],
})
export class AuthModule {}
