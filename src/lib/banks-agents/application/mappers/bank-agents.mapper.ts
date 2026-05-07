import { randomUUID } from 'crypto';
import {
  BankAgent,
  BankAgentId,
  BankAgentDescription,
  BankAgentAmount,
  PaymentDate,
} from '../../domain/index-bank.agents-domain';

import { CustomerId } from 'src/lib/customers/domain/index-domain';
import { BankId } from 'src/lib/banks/domain/index-banks-domain';
import { UserId } from 'src/lib/users/index-users-domain';

import {
  CreateBankAgentsInput,
  GetBankAgentsByCustomerIdResult,
} from '../../infrastructure/index-agent-banks-infrastructure';
import { IBankAgentCustomersIdResponseDto } from '../dtos/bank-agent-customersId.response.dto';

export class BankAgentsMapper {
  static toEntity(input: CreateBankAgentsInput): BankAgent {
    const id = new BankAgentId(randomUUID());

    const customerId = new CustomerId(input.customerId);
    const bankId = new BankId(input.bankId);
    const userId = new UserId(input.userId);
    const description = new BankAgentDescription(input.agentDescription);
    const amount = new BankAgentAmount(input.bankAgentAmount);
    const paymentDate = new PaymentDate(input.paymentDate);

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

  static toResponseDto(bankAgents: BankAgent[]) {
    return bankAgents.map((bankAgent) => ({
      id: bankAgent.id.value,
      customerId: bankAgent.customerId.value,
      bankId: bankAgent.bankId.value,
      userId: bankAgent.userId.value,
      description: bankAgent.description.value,
      amount: bankAgent.amount.value,
      paymentDate: bankAgent.paymentDate.value,
      createdAt: bankAgent.createdAt,
      updatedAt: bankAgent.updatedAt,
    }));
  }

  static toResponseList(
    data: GetBankAgentsByCustomerIdResult[],
  ): IBankAgentCustomersIdResponseDto[] {
    return data.map((item) => ({
      id: item.id,
      customerId: item.customerId,
      bankId: item.bankId,
      userId: item.userId,
      userName: item.userName,
      description: item.agentDescription,
      amount: item.bankAgentAmount,
      paymentDate: item.paymentDate,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,

      // 🔥 extras
      bankName: item.bankName,
      firstName: item.firstName,
      lastName: item.lastName,
      phone: item.phone,
      email: item.email,
    }));
  }
}
