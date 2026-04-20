import { Actions } from './actions.enum';
import { Subjects } from './subjects.enum';

export type PermissionRule = {
  action: Actions | 'manage';
  subject: Subjects | 'all';
};
