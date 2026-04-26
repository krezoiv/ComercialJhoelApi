import { Injectable } from '@nestjs/common';
import { SpExecutorService } from 'src/shared/database/sp-executor.service';
import {
  CreateBankAgentsInput,
  CreateBankgentsResult,
} from '../index-agent-banks-infrastructure';

@Injectable()
export class CreateBankAgentsSp {
  constructor(private readonly _spExecutor: SpExecutorService) {}

  async execute(
    params: CreateBankAgentsInput,
  ): Promise<CreateBankgentsResult[]> {
    return this._spExecutor.execute<CreateBankgentsResult>`
        EXEC sp_create_bank_agents
            @customer_id = ${params.customerId},
            @description = ${params.agentDescription},
            @bank_id = ${params.bankId},
            @user_id = ${params.userId},
            @amount = ${params.bankAgentAmount},
            @payment_date = ${params.paymentDate}
        `;
  }
}
