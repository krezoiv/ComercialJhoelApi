import { CqrsModule } from '@nestjs/cqrs';
import {
  CreateCustomersHandler,
  GetAllCustomersHandler,
} from './application/index-application';
import {
  PrismaService,
  SpExecutorService,
} from 'src/shared/database/index-database';
import {
  CreateCustomersSp,
  GetAllCustomersSp,
  GetCustomerStatsSp,
} from './infrastructure/index-infrastructure';
import { CUSTOMERS_REPOSITORY } from './domain/index-domain';
import { PrismaCustomersRepository } from './infrastructure/prisma/prisma-customers-repository';
import { Module } from '@nestjs/common';
import { CustomerController } from './presentation/index-presentation';
import { SearchCustomersHanlder } from './application/queries/search-customers.handler';
import { SearchCustomersSp } from './infrastructure/stored-procedures/search-customers.sp';
import { GetCustomerStatsHandler } from './application/queries/get-customers-stats.handler';

const CommandHandlers = [
  CreateCustomersHandler,
  SearchCustomersHanlder,
  GetCustomerStatsHandler,
];
const QueryHandlers = [
  GetAllCustomersHandler,
  SearchCustomersHanlder,
  GetCustomerStatsHandler,
];

@Module({
  imports: [CqrsModule],
  controllers: [CustomerController],
  providers: [
    PrismaService,
    SpExecutorService,
    CreateCustomersSp,
    GetAllCustomersSp,
    SearchCustomersSp,
    GetCustomerStatsSp,
    ...CommandHandlers,
    ...QueryHandlers,
    {
      provide: CUSTOMERS_REPOSITORY,
      useClass: PrismaCustomersRepository,
    },
  ],
})
export class CustomersModule {}
