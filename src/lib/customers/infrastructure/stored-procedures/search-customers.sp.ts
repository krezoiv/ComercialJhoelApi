import { Injectable } from '@nestjs/common';
import { SpExecutorService } from 'src/shared/database/sp-executor.service';
import { CustomerWithPerson } from '../index-infrastructure';

@Injectable()
export class SearchCustomersSp {
  constructor(private readonly _spExecutor: SpExecutorService) {}

  async execute(params: { search: string }): Promise<CustomerWithPerson[]> {
    return this._spExecutor.execute<CustomerWithPerson>`
  EXEC sp_search_customers @search = ${params.search}
`;
  }
}
