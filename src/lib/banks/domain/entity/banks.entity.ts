import { BaseEntity } from 'src/shared/domain/base-entity';
import { BankId, BankName, Description } from '../index-banks-domain';

export class Banks extends BaseEntity<BankId> {
  public bankName: BankName;
  public description: Description;

  constructor(
    id: BankId,
    bankName: BankName,
    description: Description,
    createdAt: Date,
    updatedAt: Date,
    deletedAt?: Date | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this.bankName = bankName;
    this.description = description;
  }
}
