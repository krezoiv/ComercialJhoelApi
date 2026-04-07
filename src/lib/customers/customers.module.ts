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

const CommandHandlers = [CreateCustomersHandler];
const QueryHandlers = [GetAllCustomersHandler];

@Module({
  imports: [CqrsModule],
  controllers: [CustomerController],
  providers: [
    PrismaService,
    SpExecutorService,
    CreateCustomersSp,
    GetAllCustomersSp,
    ...CommandHandlers,
    ...QueryHandlers,
    {
      provide: CUSTOMERS_REPOSITORY,
      useClass: PrismaCustomersRepository,
    },
  ],
})
export class CustomersModule {}
