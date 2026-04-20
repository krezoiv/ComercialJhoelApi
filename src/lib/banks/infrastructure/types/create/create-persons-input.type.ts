import { BanksBase } from '../bank-base.type';

export type createBanksInput = Omit<BanksBase, 'id'>;
