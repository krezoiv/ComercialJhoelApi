import { Injectable } from '@nestjs/common';
import { SpExecutorService } from 'src/shared/database/sp-executor.service';
import { IGetExpenses } from '../types/gets/get-expenses.interface';

@Injectable()
export class GetExpenseSp {
  constructor(private readonly _spExecutor: SpExecutorService) {}

  async execute(): Promise<IGetExpenses[]> {
    return this._spExecutor.execute<IGetExpenses>`
        EXEC sp_get_expenses
        `;
  }
}
