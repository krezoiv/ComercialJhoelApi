import { ForbiddenException } from '@nestjs/common';
import { ROL_MAP } from './role-map';

export class RoleMapper {
  static toDomain(role: string) {
    const mapped = ROL_MAP[role];

    if (!mapped) {
      throw new ForbiddenException(`Rol inválido: ${role}`);
    }

    return mapped;
  }
}
