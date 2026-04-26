import { Injectable } from '@nestjs/common';
import {
  BankAgent,
  BankAgentAmount,
  BankAgentDescription,
  BankAgentId,
  BankAgentsRepository,
  PaymentDate,
} from '../../domain/index-bank.agents-domain';
import { CreateBankAgentsSp } from '../stored-procedures/create-bank-agents.sp';
import { ValidationError } from 'src/shared/errors/validation-error';
import { ConflictError } from 'src/shared/errors/conflict-error';
import { DomainError } from 'src/shared/errors/domain-error';
import { CustomerId } from 'src/lib/customers/domain/index-domain';
import { BankId } from 'src/lib/banks/domain/index-banks-domain';

import { UserId } from 'src/lib/users/index-users-domain';

@Injectable()
export class PrismaBankAgentsRepository implements BankAgentsRepository {
  constructor(private readonly _createBankAgentsSp: CreateBankAgentsSp) {}
  findAll(): Promise<BankAgent[]> {
    throw new Error('Method not implemented.');
  }
  findById(id: BankAgentId): Promise<BankAgent | null> {
    throw new Error('Method not implemented.');
  }
  update(entity: BankAgent): Promise<BankAgent> {
    throw new Error('Method not implemented.');
  }
  delete(id: BankAgentId): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async create(bankAgents: BankAgent): Promise<BankAgent> {
    try {
      const result = await this._createBankAgentsSp.execute({
        userId: bankAgents.userId.value,
        customerId: bankAgents.customerId.value,
        bankId: bankAgents.bankId.value,
        agentDescription: bankAgents.description.value,
        bankAgentAmount: bankAgents.amount.value,
        paymentDate: bankAgents.paymentDate.value,
      });

      const created = result[0];
      if (!created) {
        throw new Error('No response from database');
      }
      if (created.code !== 200) {
        switch (created.code) {
          case 400:
            throw new ValidationError(created.message);

          case 409:
            throw new ConflictError(created.message);

          default:
            throw new DomainError(created.message);
        }
      }

      return new BankAgent(
        new BankAgentId(created.id),
        new CustomerId(created.customerId),
        new BankId(created.bankId),
        new UserId(created.userId),
        new BankAgentDescription(created.agentDescription),
        new BankAgentAmount(Number(created.bankAgentAmount)),
        new PaymentDate(created.paymentDate),
        new Date(created.createdAt),
        new Date(created.updatedAt),
        created.deletedAt ? new Date(created.deletedAt) : null,
      );
    } catch (error) {
      console.error(error);
      if (
        error instanceof ConflictError ||
        error instanceof ValidationError ||
        error instanceof DomainError
      ) {
        throw error;
      }

      // 👇 error inesperado
      throw new DomainError('Unexpected error creating agent');
    }
  }
}
