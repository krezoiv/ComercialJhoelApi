import { randomUUID } from 'crypto';
import { CreateRolsInput } from '../../infrastructure/index-rols-infrastructure';
import {
  Description,
  RolId,
  RolName,
  Rols,
} from '../../domain/index-rols-domain';

export class RolsMapper {
  static toEntity(input: CreateRolsInput): Rols {
    const id = new RolId(randomUUID());
    const name = new RolName(input.rolName);
    const description = new Description(input.description);
    const now = new Date();

    return new Rols(id, name, description, now, now, null);
  }

  static toResponseDto(rol: Rols) {
    return {
      id: rol.id.value,
      rolName: rol.rolName.value,
      description: rol.description.value,
      createdAt: rol.createdAt,
      updatedAt: rol.updatedAt,
    };
  }
}
