import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { BankAgentsController } from './presentation/controller/bank-agents.controller';
import { PrismaService } from 'src/shared/database/prisma.service';
import { SpExecutorService } from 'src/shared/database/sp-executor.service';
import { CreateBankAgentsSp } from './infrastructure/stored-procedures/create-bank-agents.sp';
import { CreateBankAgentsHandler } from './application/index-banks-agents-application';
import { PrismaBankAgentsRepository } from './infrastructure/prisma/prisma-bank-agents-repository';
import { GetBankAgentsByCustomersSp } from './infrastructure/stored-procedures/get-bank-agents-by-customers.sp';
import { GetBankAgentsByCustomersHandler } from './application/queries/get-bank-agent-by-customers.handler';
import { GetBankAgentsByCustomersIdHandler } from './application/queries/get-bank-agent-by-customer-id.handler';
import { GetBankAgentsByCustomersIdSp } from './infrastructure/stored-procedures/get-banks-agents-by-customers-id.sp';
import { ProcessBankAgentsHandler } from './application/commands/process-bank-agents.handler';
import { ProcessBankAgentsSp } from './infrastructure/stored-procedures/process-bank-agents.sp';

const CommandHandlers = [
  CreateBankAgentsHandler,
  GetBankAgentsByCustomersHandler,
  GetBankAgentsByCustomersIdHandler,
  ProcessBankAgentsHandler,
];

const QueryHandlers = [
  GetBankAgentsByCustomersHandler,
  GetBankAgentsByCustomersIdHandler,
  ProcessBankAgentsHandler,
];

@Module({
  imports: [CqrsModule],
  controllers: [BankAgentsController],
  providers: [
    PrismaService,
    SpExecutorService,
    CreateBankAgentsSp,
    GetBankAgentsByCustomersSp,
    GetBankAgentsByCustomersIdSp,
    ProcessBankAgentsSp,
    ...CommandHandlers,
    ...QueryHandlers,
    {
      provide: 'BANK_AGENTS_REPOSITORY',
      useClass: PrismaBankAgentsRepository,
    },
  ],
})
export class BankAgentsModule {}
