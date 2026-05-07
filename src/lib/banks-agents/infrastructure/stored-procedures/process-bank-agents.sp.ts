import { Injectable } from '@nestjs/common';
import { SpExecutorService } from 'src/shared/database/sp-executor.service';
import { ProcessBankAgentsResult } from '../index-agent-banks-infrastructure';

@Injectable()
export class ProcessBankAgentsSp {
  constructor(private readonly _spExecutor: SpExecutorService) {}

  async execute(data: any[]): Promise<ProcessBankAgentsResult[]> {
    const json = JSON.stringify(data);

    console.log('🔥 JSON:', json);

    return this._spExecutor.execute`
    EXEC sp_process_bank_agents @data = ${json}
  `;
  }
}
