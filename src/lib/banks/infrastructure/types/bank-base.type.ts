import { BaseId } from 'src/shared/infrastructure/base.type';

export interface BanksBase extends BaseId {
  bankName: string;
  description: string;
}
