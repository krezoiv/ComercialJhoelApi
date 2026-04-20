import { AcccountTypeBase } from '../account-type-base.type';

export type createAccountTypeInput = Omit<AcccountTypeBase, 'id'>;
