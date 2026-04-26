import { BankId, Banks } from 'src/lib/banks/domain/index-banks-domain';
import { CustomerId, Customers } from 'src/lib/customers/domain/index-domain';
import { UserId, Users } from 'src/lib/users/index-users-domain';
import { BaseEntity } from 'src/shared/domain/base-entity';
import {
  BankAgentAmount,
  BankAgentDescription,
  BankAgentId,
  PaymentDate,
} from '../index-bank.agents-domain';

export class BankAgent extends BaseEntity<BankAgentId> {
  public customerId: CustomerId;
  public bankId: BankId;
  public userId: UserId;

  public description: BankAgentDescription;
  public amount: BankAgentAmount;
  public paymentDate: PaymentDate;

  public bank?: Banks;
  public customer?: Customers;
  public users?: Users;

  constructor(
    id: BankAgentId,
    customerId: CustomerId,
    bankId: BankId,
    userId: UserId,
    description: BankAgentDescription,
    amount: BankAgentAmount,
    paymentDate: PaymentDate,
    createdAt: Date,
    updatedAt: Date,
    deletedAt?: Date | null,
    bank?: Banks,
    customer?: Customers,
    users?: Users,
  ) {
    super(id, createdAt, updatedAt, deletedAt);

    this.customerId = customerId;
    this.bankId = bankId;
    this.userId = userId;

    this.description = description;
    this.amount = amount;
    this.paymentDate = paymentDate;

    this.bank = bank;
    this.customer = customer;
    this.users = users;
  }
}
