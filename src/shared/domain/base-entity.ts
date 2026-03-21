export abstract class BaseEntity<ID> {
  public readonly id: ID;
  public createdAt: Date;
  public updatedAt: Date;
  public deletedAt?: Date | null;

  constructor(
    id: ID,
    createdAt: Date,
    updatedAt: Date,
    deletedAt?: Date | null,
  ) {
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt ?? null;
  }

  touch() {
    this.updatedAt = new Date();
  }

  softDelete() {
    this.deletedAt = new Date();
  }

  isDeleted(): boolean {
    return this.deletedAt !== null;
  }
}
