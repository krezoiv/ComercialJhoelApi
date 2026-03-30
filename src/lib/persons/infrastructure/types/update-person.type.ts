import { BaseAudit, BaseId } from './base.type';
import { SpResponse } from './sp-response.type';

// INPUT (lo que mandas al SP)
export interface UpdatePersonInput extends BaseId {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  email?: string;
}

// OUTPUT (lo que devuelve el SP)
export interface UpdatePersonResult extends BaseId, BaseAudit, SpResponse {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
}
