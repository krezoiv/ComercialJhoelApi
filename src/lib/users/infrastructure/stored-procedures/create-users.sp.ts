import { Injectable } from '@nestjs/common';
import { SpExecutorService } from 'src/shared/database/sp-executor.service';
import {
  CreateUsersInput,
  CreateUsersResult,
} from '../index-users-infrastructure';

@Injectable()
export class CreateUsersSp {
  constructor(private readonly _spExecutor: SpExecutorService) {}

  async execute(params: CreateUsersInput): Promise<CreateUsersResult[]> {
    return this._spExecutor.execute<CreateUsersResult>`
    EXEC sp_create_users
    @rol_Id = ${params.rolId},
    @person_Id = ${params.personId},
    @userName = ${params.userName},
    @password_hash = ${params.passwordHash}
    `;
  }
}
