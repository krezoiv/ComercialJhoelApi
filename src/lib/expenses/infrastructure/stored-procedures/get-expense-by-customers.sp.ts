import { Injectable } from '@nestjs/common';

import { IGetExpensesByCustomers } from '../types/gets/get-expense-by-customers.interface';
import { SpExecutorService } from 'src/shared/database/sp-executor.service';

@Injectable()
export class GetExpenseByCustomersSp {
  constructor(private readonly _spExecutor: SpExecutorService) {}

  async execute(): Promise<IGetExpensesByCustomers[]> {
    return this._spExecutor.execute<IGetExpensesByCustomers>`
        EXEC sp_get_expenses_by_customers
        `;
  }
}
