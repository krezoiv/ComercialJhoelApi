import { Injectable } from '@nestjs/common';
import { SpExecutorService } from 'src/shared/database/sp-executor.service';
import {
  CreateAccountTypeResults,
  createAccountTypeInput,
} from '../index-account-types-infrastructure';

@Injectable()
export class CreateAccountTypeSp {
  constructor(private readonly _spExecutor: SpExecutorService) {}

  async execute(
    params: createAccountTypeInput,
  ): Promise<CreateAccountTypeResults[]> {
    return this._spExecutor.execute<CreateAccountTypeResults>`
    EXEC sp_create_account_type
    @account_type_name = ${params.accountTypeName}
   
      `;
  }
}
