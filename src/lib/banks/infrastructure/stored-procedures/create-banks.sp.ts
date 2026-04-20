import { Injectable } from '@nestjs/common';
import { SpExecutorService } from 'src/shared/database/sp-executor.service';
import {
  CreateBanksResult,
  createBanksInput,
} from '../index-banks-infrastructure';

@Injectable()
export class CreateBanksSp {
  constructor(private readonly _spExecutor: SpExecutorService) {}

  async execute(params: createBanksInput): Promise<CreateBanksResult[]> {
    return this._spExecutor.execute<CreateBanksResult>`
    EXEC sp_create_bank
    @bank_name = ${params.bankName},
    @description = ${params.description}
      `;
  }
}
