import { Injectable } from '@nestjs/common';
import { SpExecutorService } from 'src/shared/database/index-database';
import { DeletePersonInput, DeletePersonResult } from '../index-infrastructure';

@Injectable()
export class DeletePesonSp {
  constructor(private readonly spExecutor: SpExecutorService) {}

  async execute(params: DeletePersonInput): Promise<DeletePersonResult[]> {
    return this.spExecutor.execute<DeletePersonResult>`
    EXEC sp_delete_person
      @id = ${params.id}
    `;
  }
}
