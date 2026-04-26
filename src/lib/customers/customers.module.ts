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
} from './infrastructure/index-infrastructure';
import { CUSTOMERS_REPOSITORY } from './domain/index-domain';
import { PrismaCustomersRepository } from './infrastructure/prisma/prisma-customers-repository';
import { Module } from '@nestjs/common';
import { CustomerController } from './presentation/index-presentation';
import { SearchCustomersHanlder } from './application/queries/search-customers.handler';
import { SearchCustomersSp } from './infrastructure/stored-procedures/search-customers.sp';

const CommandHandlers = [CreateCustomersHandler, SearchCustomersHanlder];
const QueryHandlers = [GetAllCustomersHandler, SearchCustomersHanlder];

@Module({
  imports: [CqrsModule],
  controllers: [CustomerController],
  providers: [
    PrismaService,
    SpExecutorService,
    CreateCustomersSp,
    GetAllCustomersSp,
    SearchCustomersSp,
    ...CommandHandlers,
    ...QueryHandlers,
    {
      provide: CUSTOMERS_REPOSITORY,
      useClass: PrismaCustomersRepository,
    },
  ],
})
export class CustomersModule {}
