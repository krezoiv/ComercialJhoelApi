import { Injectable } from '@nestjs/common';
import {
  Actions,
  AppAbility,
  RequestUser,
  Subjects,
} from '../index-shared -auth';
import { permissions } from '../permissions/permissions';
@Injectable()
export class AbilityFactory {
  createForUser(user: RequestUser): AppAbility {
    const rules = permissions[user.rol] || [];

    return {
      can: (action: Actions, subject: Subjects): boolean => {
        return rules.some((rule) => {
          // 🔥 SUPERADMIN
          if (rule.action === 'manage' && rule.subject === 'all') {
            return true;
          }

          // 🔥 AQUÍ EL FIX
          if (rule.action !== 'manage' && rule.subject !== 'all') {
            return rule.action === action && rule.subject === subject;
          }

          return false;
        });
      },
    };
  }
}
