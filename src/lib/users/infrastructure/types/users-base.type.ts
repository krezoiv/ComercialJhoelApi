import { BaseId } from 'src/shared/infrastructure/base.type';

export interface UsersBase extends BaseId {
  userName: string;
  passwordHash: string;
  personId: string;
  rolId: string;
}
