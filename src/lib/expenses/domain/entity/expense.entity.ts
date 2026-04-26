import { UserId, Users } from 'src/lib/users/index-users-domain';
import { BaseEntity } from 'src/shared/domain/base-entity';
import {
  ExpenseId,
  ExpenseAmount,
  ExpenseDescription,
} from '../index-expenses-domain';
import { CustomerId, Customers } from 'src/lib/customers/domain/index-domain';
import { ExpenseType } from '../value-objects/expense-type';

export class Expense extends BaseEntity<ExpenseId> {
  public userId: UserId;
  public customerId: CustomerId;

  public amount: ExpenseAmount;
  public description: ExpenseDescription;
  public expenseType: ExpenseType;

  public users?: Users;
  public customer?: Customers;

  constructor(
    id: ExpenseId,
    userId: UserId,
    customerId: CustomerId,
    description: ExpenseDescription,
    amount: ExpenseAmount,
    expenseType: ExpenseType,
    createdAt: Date,
    updatedAt: Date,
    deletedAt?: Date | null,
    users?: Users,
    customer?: Customers,
  ) {
    super(id, createdAt, updatedAt, deletedAt);

    this.userId = userId;
    this.customerId = customerId;
    this.description = description;
    this.amount = amount;
    this.expenseType = expenseType;

    this.users = users;
    this.customer = customer;
  }
}
