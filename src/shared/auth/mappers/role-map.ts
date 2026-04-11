import { RolsList } from '../types/rols.enum';

export const ROL_MAP: Record<string, RolsList> = {
  admin: RolsList.ADMIN,
  user: RolsList.USER,
  superadmin: RolsList.SUPERADMIN,
};
