import { BaseId } from '../../../../shared/infrastructure/base.type';

export interface PersonBase extends BaseId {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
}
