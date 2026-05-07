import { Injectable } from '@nestjs/common';
import { SpExecutorService } from 'src/shared/database/sp-executor.service';
import {
  GetBankAgentsByCustomerIdResult,
  GetBankAgentsCustomersByIdInput,
} from '../index-agent-banks-infrastructure';

@Injectable()
export class GetBankAgentsByCustomersIdSp {
  constructor(private readonly _spExecutor: SpExecutorService) {}

  async execute(
    params: GetBankAgentsCustomersByIdInput,
  ): Promise<GetBankAgentsByCustomerIdResult[]> {
    return this._spExecutor.execute<GetBankAgentsByCustomerIdResult>`
    EXEC sp_get_bank_agents_by_customer_id
      @customer_id = ${params.id}
    `;
  }
}
