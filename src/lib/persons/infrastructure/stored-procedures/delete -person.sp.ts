import { Injectable } from '@nestjs/common';
import { SpExecutorService } from 'src/shared/database/sp-executor.service';
import {
  DeletePersonInput,
  DeletePersonResult,
} from '../types/delete-person.type';

@Injectable()
export class DeletePesonSp {
  constructor(private readonly spExecutor: SpExecutorService) {}

  // async execute(params: DeletePerson): Promise<SpResponse[]> {
  //   return this.spExecutor.execute<SpResponse>`
  //     EXEC sp_delete_person
  //       @id = ${params.id},
  //       @deleted_at = ${params.deleted_at},
  //       @updated_at = ${params.updated_at}
  //     `;
  // }

  async execute(params: DeletePersonInput): Promise<DeletePersonResult[]> {
    return this.spExecutor.execute<DeletePersonResult>`
    EXEC sp_delete_person
      @id = ${params.id}
    `;
  }
}
