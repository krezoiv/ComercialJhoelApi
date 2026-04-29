import { Injectable } from '@nestjs/common';
import { SpExecutorService } from 'src/shared/database/sp-executor.service';
import { IGetBankAgentsByCustomers } from '../types/gets/get-bank-agents-by-customers.interface';

@Injectable()
export class GetBankAgentsByCustomersSp {
  constructor(private readonly _spExecutor: SpExecutorService) {}

  async execute(): Promise<IGetBankAgentsByCustomers[]> {
    return this._spExecutor.execute<IGetBankAgentsByCustomers>`
        EXEC sp_get_bank_agents_by_customers
        `;
  }
}
