import { Injectable } from '@nestjs/common';
import { SpExecutorService } from 'src/shared/database/index-database';
import {
  GetPersonByIdInput,
  GetPersonByIdResult,
} from '../index-infrastructure';

@Injectable()
export class GetPersonByIdSp {
  constructor(private readonly _spExecutor: SpExecutorService) {}

  async execute(params: GetPersonByIdInput): Promise<GetPersonByIdResult[]> {
    return this._spExecutor.execute<GetPersonByIdResult>`
    EXEC sp_get_person_by_id
      @id = ${params.id}
    `;
  }
}
