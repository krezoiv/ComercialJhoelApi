import { UsersBase } from '../users-base.type';

export type CreateUsersInput = Omit<UsersBase, 'id'>;
