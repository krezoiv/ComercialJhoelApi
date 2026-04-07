import { BaseId } from 'src/shared/infrastructure/base.type';

export interface RolsBase extends BaseId {
  name: string;
  description: string;
}
