import { BaseAudit, SpResponse } from 'src/shared/infrastructure/base.type';
import { AcccountTypeBase } from '../account-type-base.type';

export interface CreateAccountTypeResults
  extends AcccountTypeBase, BaseAudit, SpResponse {}
