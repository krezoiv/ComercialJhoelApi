import { Injectable } from '@nestjs/common';
import {
  Actions,
  AppAbility,
  RequestUser,
  RolsList,
  Subjects,
} from '../index-shared -auth';

@Injectable()
export class AbilityFactory {
  createForUser(user: RequestUser): AppAbility {
    return {
      can: (action: Actions, subject: Subjects): boolean => {
        // 🔥 SUPERADMIN puede TODO
        if (user.rol === RolsList.SUPERADMIN) {
          return true;
        }

        // 🔥 ADMIN puede todo en Persons
        if (user.rol === RolsList.ADMIN) {
          if (subject === Subjects.Persons) {
            return true;
          }
        }

        // 🔥 USER solo puede leer Persons
        if (user.rol === RolsList.USER) {
          if (action === Actions.Read && subject === Subjects.Persons) {
            return true;
          }

          return false;
        }

        return false;
      },
    };
  }
}
