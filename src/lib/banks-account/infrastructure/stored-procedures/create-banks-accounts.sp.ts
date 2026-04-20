import { Injectable } from '@nestjs/common';
import { SpExecutorService } from 'src/shared/database/sp-executor.service';
import {
  CreateBanksAccountsInput,
  CreateBanksAccountsResults,
} from '../index-banks-accounts-infrastructure';

@Injectable()
export class CreateBanksAccountsSp {
  constructor(private readonly _spExecutor: SpExecutorService) {}

  async execute(
    params: CreateBanksAccountsInput,
  ): Promise<CreateBanksAccountsResults[]> {
    return this._spExecutor.execute<CreateBanksAccountsResults>`
    EXEC sp_create_bank_account
      @initial_balance = ${params.initialBalance},
      @final_balance = ${params.finalBalance},
      @bank_id = ${params.bankId},
      @account_type_id = ${params.accountTypeId},
      @account_number = ${params.bankAccountNumber},
      @account_name = ${params.bankAccountName}
    `;
  }
}
