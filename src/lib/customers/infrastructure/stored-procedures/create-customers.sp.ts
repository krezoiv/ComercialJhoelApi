import { Injectable } from '@nestjs/common';
import { SpExecutorService } from 'src/shared/database/sp-executor.service';
import {
  CreateCustomersInput,
  CreateCustomersResult,
} from '../types/create-customers.type';

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
