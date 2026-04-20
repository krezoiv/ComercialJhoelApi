import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateBanksHandler } from './application/index-banks-application';
import { AuthModule } from '../auth/auth.module';
import { BanksController } from './presentation/index-banks-presentation';
import { PrismaService } from 'src/shared/database/prisma.service';
import { SpExecutorService } from 'src/shared/database/sp-executor.service';
import { PrismaBanksRepository } from './infrastructure/prisma/prisma-banks.repositoty';
import { BANKS_REPOSITORY } from './domain/index-banks-domain';
import { GetAllBanksHandler } from './application/queries/get-all-banks.handler';
import { CreateBanksSp } from './infrastructure/stored-procedures/create-banks.sp';
import { GetAllBanksSp } from './infrastructure/stored-procedures/get-all-banks.sp';

const CommandHandlers = [CreateBanksHandler, GetAllBanksHandler];
const QueryHandlers = [GetAllBanksHandler];

@Module({
  imports: [CqrsModule, AuthModule],

  controllers: [BanksController],

  providers: [
    PrismaService,
    SpExecutorService,
    CreateBanksSp,
    GetAllBanksSp,

    ...CommandHandlers,
    ...QueryHandlers,

    {
      provide: BANKS_REPOSITORY,
      useClass: PrismaBanksRepository,
    },
  ],
})
export class BanksModude {}
