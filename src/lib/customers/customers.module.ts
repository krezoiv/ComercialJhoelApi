import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CUSTOMERS_REPOSITORY } from './domain/respository/customers.repository.token';
import { CustomerController } from './presentation/controllers/customers.controller';
import { PrismaService } from 'src/shared/database/prisma.service';
import { SpExecutorService } from 'src/shared/database/sp-executor.service';
import { GetAllCustomersSp } from './infrastructure/stored-procedures/get-all-customers.sp';
import { GetAllCustomersHandler } from './application/quieries/get-all-customers.handler';
import { PrismaCustomersRepository } from './infrastructure/prisma/prisma-customers-repository';
//import { CreateCustomersCommand } from './application/commands/create-customers.command';
import { CreateCustomersSp } from './infrastructure/stored-procedures/create-customers.sp';
import { CreateCustomersHandler } from './application/commands/create-customers.handler';

const CommandHandlers = [CreateCustomersHandler];
const QueryHandlers = [GetAllCustomersHandler];

@Module({
  imports: [CqrsModule],

  controllers: [CustomerController],

  providers: [
    PrismaService,
    SpExecutorService,
    GetAllCustomersSp,
    CreateCustomersSp,
    ...CommandHandlers,
    ...QueryHandlers,

    {
      provide: CUSTOMERS_REPOSITORY,
      useClass: PrismaCustomersRepository,
    },
  ],
})
export class CustomersModule {}
