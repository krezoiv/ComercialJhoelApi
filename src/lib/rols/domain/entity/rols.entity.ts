import { BaseEntity } from 'src/shared/domain/index-shared-domin';
import { Description, RolId, RolName } from '../index-rols-domain';

export class Rols extends BaseEntity<RolId> {
  public rolName: RolName;
  public description: Description;

  constructor(
    id: RolId,
    rolName: RolName,
    description: Description,
    createdAt: Date,
    updatedAt: Date,
    deletedAt?: Date | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this.rolName = rolName;
    this.description = description;
  }
}
