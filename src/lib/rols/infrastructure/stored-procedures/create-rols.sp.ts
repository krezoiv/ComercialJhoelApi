import { Injectable } from '@nestjs/common';
import { SpExecutorService } from 'src/shared/database/index-database';
import {
  CreateRolsInput,
  CreateRolsRsults,
} from '../index-rols-infrastructure';

@Injectable()
export class CreateRolsSp {
  constructor(private readonly _spExecutor: SpExecutorService) {}

  async execute(params: CreateRolsInput): Promise<CreateRolsRsults[]> {
    return this._spExecutor.execute<CreateRolsRsults>`
      EXEC sp_create_rols
        @name = ${params.name},
        @description = ${params.description}
      `;
  }
}
