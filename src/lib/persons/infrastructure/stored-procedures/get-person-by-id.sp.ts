import { Injectable } from '@nestjs/common';
import { SpExecutorService } from 'src/shared/database/sp-executor.service';
import {
  GetPersonByIdInput,
  GetPersonByIdResult,
} from '../types/get-person-by-id.type';

@Injectable()
export class GetPersonByIdSp {
  constructor(private readonly spExecutor: SpExecutorService) {}

  // async execute(params: GetPersonById): Promise<SpResponse[]> {
  //   return this.spExecutor.execute<SpResponse>`
  //       EXEC sp_get_person_by_id
  //       @id = ${params.id}
  //     `;
  // }

  async execute(params: GetPersonByIdInput): Promise<GetPersonByIdResult[]> {
    return this.spExecutor.execute<GetPersonByIdResult>`
    EXEC sp_get_person_by_id
      @id = ${params.id}
    `;
  }
}
