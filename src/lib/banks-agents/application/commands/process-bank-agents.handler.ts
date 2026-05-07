import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ProcessBankAgentsCommand } from './process-bank-agents.command';
import { BankAgentsRepository } from '../../domain/index-bank.agents-domain';
import { ProcessBankAgentsResult } from '../../infrastructure/index-agent-banks-infrastructure';

@CommandHandler(ProcessBankAgentsCommand)
export class ProcessBankAgentsHandler implements ICommandHandler<ProcessBankAgentsCommand> {
  constructor(
    @Inject('BANK_AGENTS_REPOSITORY')
    private readonly _repository: BankAgentsRepository,
  ) {}

  async execute(
    command: ProcessBankAgentsCommand,
  ): Promise<ProcessBankAgentsResult> {
    return this._repository.processBankAgents(command.data);
  }
}
