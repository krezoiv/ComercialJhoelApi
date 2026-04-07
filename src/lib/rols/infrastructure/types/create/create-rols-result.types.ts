import { BaseAudit, SpResponse } from 'src/shared/infrastructure/base.type';
import { RolsBase } from '../../index-rols-infrastructure';

export interface CreateRolsRsults
  extends RolsBase, BaseAudit, SpResponse, SpResponse {}
