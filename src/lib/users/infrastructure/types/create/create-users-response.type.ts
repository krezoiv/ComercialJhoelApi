import { BaseAudit, SpResponse } from 'src/shared/infrastructure/base.type';
import { UsersBase } from '../users-base.type';

export interface CreateUsersResult extends UsersBase, BaseAudit, SpResponse {}
