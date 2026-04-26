import { Injectable } from '@nestjs/common';
import { SpExecutorService } from 'src/shared/database/index-database';
import {
  CreateExpenseInput,
  CreateExpenseResult,
} from '../index-expense-infrastructure';

@Injectable()
export class CreateExpenseSp {
  constructor(private readonly _spExecutor: SpExecutorService) {}

  async execute(params: CreateExpenseInput): Promise<CreateExpenseResult[]> {
    return this._spExecutor.execute<CreateExpenseResult>`
        EXEC sp_create_expense
            @description = ${params.expenseDescription},
            @customer_id = ${params.customerId},
            @user_id = ${params.userId},
            @amount = ${params.expenseAmount},
            @expense_type = ${params.expenseType}
        `;
  }
}
