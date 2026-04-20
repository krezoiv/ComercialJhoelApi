import { Injectable } from '@nestjs/common';
import { SpExecutorService } from 'src/shared/database/sp-executor.service';
import { GetAllBanksResults } from '../types/gets/get-all-banks-results';

@Injectable()
export class GetAllBanksSp {
  constructor(private readonly _spExecutor: SpExecutorService) {}

  async execute(): Promise<GetAllBanksResults[]> {
    return this._spExecutor.execute<GetAllBanksResults>`
        EXEC sp_get_all_banks
      `;
  }
}
