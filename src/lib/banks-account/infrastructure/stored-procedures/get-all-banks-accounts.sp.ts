import { Injectable } from '@nestjs/common';
import { SpExecutorService } from 'src/shared/database/sp-executor.service';
import { GetAllBanksAccounts } from '../index-banks-accounts-infrastructure';

@Injectable()
export class GetAllBanksAccountsSp {
  constructor(private readonly _spExecutor: SpExecutorService) {}

  async execute(): Promise<GetAllBanksAccounts[]> {
    return this._spExecutor.execute<GetAllBanksAccounts>`
        EXEC sp_get_bank_accounts
        `;
  }
}
