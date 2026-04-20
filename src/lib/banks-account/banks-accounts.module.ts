import { Module } from '@nestjs/common';
import { CreateBanksAccountsHandler } from './application/index-banks-accounts-application';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthModule } from '../auth/auth.module';
import { BanksAccountsController } from './presentation/controller/banks-accounts.controller';
import { PrismaService } from 'src/shared/database/prisma.service';
import { SpExecutorService } from 'src/shared/database/sp-executor.service';
import {
  CreateBanksAccountsSp,
  UpdateFinalBalanceSp,
} from './infrastructure/index-banks-accounts-infrastructure';
import { BANKS_ACCOUNTS_REPOSITORY } from './domain/index-bank-account-domain';
import { PrismaBanksAccountsRepository } from './infrastructure/prisma/prisma-banks-accounts.repository';
import { GetAllBanksAccountsHandler } from './application/queries/get-accounts-banks.handler';
import { GetAllBanksAccountsSp } from './infrastructure/stored-procedures/get-all-banks-accounts.sp';
import { UpdateFinalBalanceHandler } from './application/commands/update-final-balance.hanlder';

const CommandHandlers = [
  CreateBanksAccountsHandler,
  GetAllBanksAccountsHandler,
  UpdateFinalBalanceHandler,
];

const QueryHandlers = [GetAllBanksAccountsHandler];
@Module({
  imports: [CqrsModule, AuthModule],

  controllers: [BanksAccountsController],

  providers: [
    PrismaService,
    SpExecutorService,
    CreateBanksAccountsSp,
    GetAllBanksAccountsSp,
    UpdateFinalBalanceSp,
    ...CommandHandlers,
    ...QueryHandlers,

    {
      provide: BANKS_ACCOUNTS_REPOSITORY,
      useClass: PrismaBanksAccountsRepository,
    },
  ],
})
export class BanksAccountsModule {}
