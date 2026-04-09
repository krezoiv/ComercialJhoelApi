import { BaseId } from 'src/shared/infrastructure/base.type';

export interface RolsBase extends BaseId {
  rolName: string;
  description: string;
}
