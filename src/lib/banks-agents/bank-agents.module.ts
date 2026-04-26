import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { BankAgentsController } from './presentation/controller/bank-agents.controller';
import { PrismaService } from 'src/shared/database/prisma.service';
import { SpExecutorService } from 'src/shared/database/sp-executor.service';
import { CreateBankAgentsSp } from './infrastructure/stored-procedures/create-bank-agents.sp';
import { CreateBankAgentsHandler } from './application/index-banks-agents-application';
import { PrismaBankAgentsRepository } from './infrastructure/prisma/prisma-bank-agents-repository';

const CommandHandlers = [CreateBankAgentsHandler];
@Module({
  imports: [CqrsModule],
  controllers: [BankAgentsController],
  providers: [
    PrismaService,
    SpExecutorService,
    CreateBankAgentsSp,
    ...CommandHandlers,
    {
      provide: 'BANK_AGENTS_REPOSITORY',
      useClass: PrismaBankAgentsRepository,
    },
  ],
})
export class BankAgentsModule {}
