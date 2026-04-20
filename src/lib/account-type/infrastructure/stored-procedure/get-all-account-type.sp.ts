import { Injectable } from '@nestjs/common';
import { SpExecutorService } from 'src/shared/database/sp-executor.service';
import { GetAllAccountTypeResult } from '../types/gets/get-all-account-type.results.interface';

@Injectable()
export class GetAllAccountTypeSp {
  constructor(private readonly _spExecutor: SpExecutorService) {}

  async execute(): Promise<GetAllAccountTypeResult[]> {
    return this._spExecutor.execute<GetAllAccountTypeResult>`
        EXEC sp_get_all_account_type
      `;
  }
}
