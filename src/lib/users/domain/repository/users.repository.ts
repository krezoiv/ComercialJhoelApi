import { BaseRepository } from 'src/shared/domain/base-repository';
import { UserId, Users } from '../../index-users-domain';
import { UsersWithRelations } from '../../infrastructure/index-users-infrastructure';

export interface UsersRepository extends BaseRepository<Users, UserId> {
  findAllUsersWithRelation(): Promise<UsersWithRelations[]>;
}
