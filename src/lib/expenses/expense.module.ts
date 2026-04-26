import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaService } from 'src/shared/database/prisma.service';
import { SpExecutorService } from 'src/shared/database/sp-executor.service';
import { CreateExpenseSp } from './infrastructure/stored-procedures/create-expense.sp';
import { CreateExpenseHandler } from './application/commands/create-expense.handler';
import { PrismaExpenseRepository } from './infrastructure/prisma/prisma-expense-repository';
import { ExpenseController } from './presentation/controller/expense.controller';
import { GetExpenseHanlder } from './application/queries/get-expense.handler';
import { GetExpenseSp } from './infrastructure/stored-procedures/get-expense.sp';
import { GetExpensesByCustomersHandler } from './application/index-expense-application';
import { GetExpenseByCustomersSp } from './infrastructure/index-expense-infrastructure';

const CommandHandlers = [
  CreateExpenseHandler,
  GetExpenseHanlder,
  GetExpensesByCustomersHandler,
];
const QueryHandlers = [GetExpenseHanlder, GetExpensesByCustomersHandler];
@Module({
  imports: [CqrsModule],
  controllers: [ExpenseController],
  providers: [
    PrismaService,
    SpExecutorService,
    CreateExpenseSp,
    GetExpenseSp,
    GetExpenseByCustomersSp,
    ...CommandHandlers,
    ...QueryHandlers,
    {
      provide: 'EXPENSES_REPOSITORY',
      useClass: PrismaExpenseRepository,
    },
  ],
})
export class ExpenseModule {}
