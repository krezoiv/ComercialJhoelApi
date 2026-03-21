import { DomainError } from './domain-error';

export class NotFoundError extends DomainError {
  constructor(entity: string) {
    super(`${entity} not found`);
  }
}
