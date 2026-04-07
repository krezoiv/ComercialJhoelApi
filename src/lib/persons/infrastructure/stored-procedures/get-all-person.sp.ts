import { Injectable } from '@nestjs/common';
import { SpExecutorService } from 'src/shared/database/index-database';
import { GetAllPersonResults } from '../index-infrastructure';

@Injectable()
export class GetAllPersonSp {
  constructor(private readonly spExecutor: SpExecutorService) {}

  async execute(): Promise<GetAllPersonResults[]> {
    return this.spExecutor.execute<GetAllPersonResults>`
    EXEC sp_get_all_persons
    `;
  }
}
