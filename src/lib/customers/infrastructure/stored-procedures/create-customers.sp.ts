import { Injectable } from '@nestjs/common';
import { SpExecutorService } from 'src/shared/database/index-database';
import {
  CreateCustomersInput,
  CreateCustomersResult,
} from '../index-infrastructure';

@Injectable()
export class CreateCustomersSp {
  constructor(private readonly _spExecutor: SpExecutorService) {}

  async execute(
    params: CreateCustomersInput,
  ): Promise<CreateCustomersResult[]> {
    return this._spExecutor.execute<CreateCustomersResult>`
        EXEC sp_create_customer
            @person_id = ${params.personId}
        `;
  }
}
