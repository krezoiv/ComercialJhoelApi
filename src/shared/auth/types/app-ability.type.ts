import { Actions } from './actions.enum';
import { Subjects } from './subjects.enum';

export interface AppAbility {
  can(action: Actions, subject: Subjects): boolean;
}
