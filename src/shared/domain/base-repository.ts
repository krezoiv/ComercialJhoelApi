export interface BaseRepository<Entity, ID> {
  create(entity: Entity): Promise<Entity>;

  findAll(): Promise<Entity[]>;

  findById(id: ID): Promise<Entity | null>;

  update(entity: Entity): Promise<Entity>;

  delete(id: ID): Promise<void>;
}
