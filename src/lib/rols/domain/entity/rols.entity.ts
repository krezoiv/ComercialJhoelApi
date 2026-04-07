import { BaseEntity } from 'src/shared/domain/index-shared-domin';
import { Description, Name, RolId } from '../index-rols-domain';

export class Rols extends BaseEntity<RolId> {
  public name: Name;
  public description: Description;

  constructor(
    id: RolId,
    name: Name,
    description: Description,
    createdAt: Date,
    updatedAt: Date,
    deletedAt?: Date | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this.name = name;
    this.description = description;
  }
}
