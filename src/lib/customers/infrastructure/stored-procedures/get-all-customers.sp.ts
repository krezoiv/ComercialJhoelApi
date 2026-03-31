import { SpExecutorService } from 'src/shared/database/sp-executor.service';
import { GetAllCustomerResults } from '../types/get-all-customers.type';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetAllCustomersSp {
  constructor(private readonly spExecutor: SpExecutorService) {}

  async execute(): Promise<GetAllCustomerResults[]> {
    return this.spExecutor.execute<GetAllCustomerResults>`
        EXEC sp_get_all_customers
        
        `;
  }
}
