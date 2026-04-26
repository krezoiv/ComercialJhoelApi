import { randomUUID } from 'crypto';
import {
  BankAgent,
  BankAgentAmount,
  BankAgentDescription,
  BankAgentId,
  PaymentDate,
} from '../../domain/index-bank.agents-domain';
import { CreateBankAgentsInput } from '../../infrastructure/index-agent-banks-infrastructure';
import { CustomerId } from 'src/lib/customers/domain/index-domain';
import { BankId } from 'src/lib/banks/domain/index-banks-domain';
import { UserId } from 'src/lib/users/index-users-domain';

export class BankAgentsMapper {
  static toEntity(input: CreateBankAgentsInput): BankAgent {
    const id = new BankAgentId(randomUUID());
    const customerId = new CustomerId(input.customerId);
    const bankId = new BankId(input.bankId);
    const userId = new UserId(input.userId);
    const description = new BankAgentDescription(input.agentDescription);
    const amount = new BankAgentAmount(input.bankAgentAmount);
    const paymentDate = new PaymentDate(new Date(input.paymentDate));
    const now = new Date();

    return new BankAgent(
      id,
      customerId,
      bankId,
      userId,
      description,
      amount,
      paymentDate,
      now,
      now,
    );
  }

  static toResponseDto(bankAgent: BankAgent) {
    return {
      id: bankAgent.id.value,
      customerId: bankAgent.customerId.value,
      bankId: bankAgent.bankId.value,
      userId: bankAgent.userId.value,
      description: bankAgent.description.value,
      amount: bankAgent.amount.value,
      paymentDate: bankAgent.paymentDate.value,
      createdAt: bankAgent.createdAt,
      updatedAt: bankAgent.updatedAt,
    };
  }
}
