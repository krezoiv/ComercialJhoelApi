import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateBankAgentsCommand } from './create-bank-agents.command';
import { Inject } from '@nestjs/common';
import { BankAgentsRepository } from '../../domain/index-bank.agents-domain';
import { BankAgentsMapper } from '../mappers/bank-agents.mapper';

@CommandHandler(CreateBankAgentsCommand)
export class CreateBankAgentsHandler implements ICommandHandler<CreateBankAgentsCommand> {
  constructor(
    @Inject('BANK_AGENTS_REPOSITORY')
    private readonly _bankAgentsRepository: BankAgentsRepository,
  ) {}

  async execute(command: CreateBankAgentsCommand) {
    const bankAgent = BankAgentsMapper.toEntity({
      customerId: command.customerId,
      bankId: command.bankId,
      userId: command.userId,
      agentDescription: command.description,
      bankAgentAmount: command.amount,
      paymentDate: command.paymentDate,
    });
    return this._bankAgentsRepository.create(bankAgent);
  }
}
