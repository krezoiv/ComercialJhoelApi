import { Actions } from '../types/actions.enum';
import { PermissionRule } from '../types/permmission-rules.type';
import { RolsList } from '../types/rols.enum';
import { Subjects } from '../types/subjects.enum';

export const permissions: Record<RolsList, PermissionRule[]> = {
  [RolsList.SUPERADMIN]: [{ action: 'manage', subject: 'all' }],

  [RolsList.ADMIN]: [
    { action: Actions.Read, subject: Subjects.Banks },
    { action: Actions.Create, subject: Subjects.Banks },
    { action: Actions.Read, subject: Subjects.AccountType },
    { action: Actions.Create, subject: Subjects.AccountType },
    { action: Actions.Read, subject: Subjects.BanksAccounts },
    { action: Actions.Create, subject: Subjects.BanksAccounts },
  ],

  [RolsList.USER]: [{ action: Actions.Read, subject: Subjects.Persons }],
};
