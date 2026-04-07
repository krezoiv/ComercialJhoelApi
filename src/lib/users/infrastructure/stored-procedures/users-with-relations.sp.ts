import { SpExecutorService } from 'src/shared/database/sp-executor.service';
import { UsersWithRelations } from '../index-users-infrastructure';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersWithRelationsSp {
  constructor(private readonly _spExecutor: SpExecutorService) {}

  async execute(): Promise<UsersWithRelations[]> {
    return this._spExecutor.execute<UsersWithRelations>`
        EXEC sp_users_with_relations
        `;
  }
}
