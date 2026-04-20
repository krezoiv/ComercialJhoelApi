import { BaseAudit, SpResponse } from 'src/shared/infrastructure/base.type';
import { AcccountTypeBase } from '../account-type-base.type';

export interface GetAllAccountTypeResult
  extends AcccountTypeBase, BaseAudit, SpResponse {}
