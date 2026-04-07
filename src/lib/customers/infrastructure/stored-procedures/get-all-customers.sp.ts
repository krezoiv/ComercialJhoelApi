import { Injectable } from '@nestjs/common';
import { SpExecutorService } from 'src/shared/database/index-database';
import { GetAllCustomerResults } from '../index-infrastructure';

@Injectable()
export class GetAllCustomersSp {
  constructor(private readonly spExecutor: SpExecutorService) {}

  async execute(): Promise<GetAllCustomerResults[]> {
    return this.spExecutor.execute<GetAllCustomerResults>`
        EXEC sp_get_all_customers
        `;
  }
}
