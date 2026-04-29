import { Injectable } from '@nestjs/common';
import { SpExecutorService } from 'src/shared/database/sp-executor.service';
import { IGetCustomerStats } from '../types/get-customer.stats-interface';

@Injectable()
export class GetCustomerStatsSp {
  constructor(private readonly _spExecutor: SpExecutorService) {}

  async execute(): Promise<IGetCustomerStats[]> {
    return this._spExecutor.execute<IGetCustomerStats>`
        EXEC sp_get_customers_with_stats
        `;
  }
}
