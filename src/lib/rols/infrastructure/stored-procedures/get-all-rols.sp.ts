import { Injectable } from '@nestjs/common';
import { GetAllRolsResults } from '../index-rols-infrastructure';
import { SpExecutorService } from 'src/shared/database/index-database';

@Injectable()
export class GetAllRolsSp {
  constructor(private readonly _spExecutor: SpExecutorService) {}

  async execute(): Promise<GetAllRolsResults[]> {
    return this._spExecutor.execute<GetAllRolsResults>`
    EXEC sp_get_all_rols
    `;
  }
}
