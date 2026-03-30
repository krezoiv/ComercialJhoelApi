import { Injectable } from '@nestjs/common';
import { SpExecutorService } from 'src/shared/database/sp-executor.service';
import { GetAllPersonResults } from '../types/get-all-person.type';

@Injectable()
export class GetAllPersonSp {
  constructor(private readonly spExecutor: SpExecutorService) {}

  async execute(): Promise<GetAllPersonResults[]> {
    return this.spExecutor.execute<GetAllPersonResults>`
    EXEC sp_get_all_persons
    `;
  }
}
