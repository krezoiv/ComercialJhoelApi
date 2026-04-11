import { RolsList } from './rols.enum';

export interface RequestUser {
  sub: string;
  userName: string;
  rol: RolsList;
}
