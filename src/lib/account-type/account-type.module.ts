import { Module } from '@nestjs/common';
import { CreateAccountTypeHandler } from './application/commands/create-account-type.handler';
import { GetAllAccountTypeHandler } from './application/queries/get-all-account-types.handler';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthModule } from '../auth/auth.module';
import { AccountTypeController } from './presentation/controller/account-type.controller';
import { PrismaService } from 'src/shared/database/prisma.service';
import { SpExecutorService } from 'src/shared/database/sp-executor.service';
import { CreateAccountTypeSp } from './infrastructure/stored-procedure/create-account-type.sp';
import { GetAllAccountTypeSp } from './infrastructure/stored-procedure/get-all-account-type.sp';
import { ACCOUNT_TYPE_REPOSITORY } from './domain/index-account-type-domain';
import { PrismaAccountTypeRepository } from './infrastructure/index-account-types-infrastructure';

const CommandHanlders = [CreateAccountTypeHandler, GetAllAccountTypeHandler];
const QueryHandlers = [GetAllAccountTypeHandler];

@Module({
  imports: [CqrsModule, AuthModule],

  controllers: [AccountTypeController],

  providers: [
    PrismaService,
    SpExecutorService,
    CreateAccountTypeSp,
    GetAllAccountTypeSp,

    ...CommandHanlders,
    ...QueryHandlers,

    {
      provide: ACCOUNT_TYPE_REPOSITORY,
      useClass: PrismaAccountTypeRepository,
    },
  ],
})
export class AccountTypeModule {}
