import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateExpenseDto } from '../../application/dtos/create-expense.dto';
import { Expense } from '../../domain/index-expenses-domain';
import { CreateExpenseCommand } from '../../application/commands/create-expense.command';
import { Request } from 'express';
import {
  GetExpenseQuery,
  GetExpensesByCustomersQuery,
} from '../../application/index-expense-application';
import { AuthGuard } from '@nestjs/passport';
import { RequestWithUser } from 'src/shared/auth/types/request-with-user.interface';

@Controller('expenses')
export class ExpenseController {
  constructor(
    private readonly _commandBus: CommandBus,
    private readonly _queryBus: QueryBus,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(
    @Body() dto: CreateExpenseDto,
    @Req() req: RequestWithUser,
  ): Promise<Expense> {
    return this._commandBus.execute(
      new CreateExpenseCommand(
        req.user.id, // 🔥 ya tipado correctamente
        dto.customerId,
        dto.expenseDescription,
        dto.expenseAmount,
        dto.expenseType,
      ),
    );
  }

  @Get()
  async getExpenses(): Promise<Expense> {
    return this._queryBus.execute(new GetExpenseQuery());
  }

  @Get('expenses-customer')
  async getExpensesByCustomers(): Promise<Expense> {
    return this._queryBus.execute(new GetExpensesByCustomersQuery());
  }
}
