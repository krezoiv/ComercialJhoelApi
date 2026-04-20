import { Injectable } from '@nestjs/common';
import { SpExecutorService } from 'src/shared/database/sp-executor.service';
import {} from '../index-banks-accounts-infrastructure';

@Injectable()
export class UpdateFinalBalanceSp {
  constructor(private readonly _spExecutor: SpExecutorService) {}

  async execute(params: {
    updates: { accountNumber: string; finalBalance: number }[];
  }) {
    const json = JSON.stringify(params.updates);

    return this._spExecutor.execute`
      EXEC sp_update_final_balance_by_account_number
      @json = ${json}
    `;
  }
}
