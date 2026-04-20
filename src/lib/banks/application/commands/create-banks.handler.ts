import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateBanksCommand } from './create-banks.command';
import { Inject } from '@nestjs/common';
import {
  BANKS_REPOSITORY,
  BanksRepository,
} from '../../domain/index-banks-domain';
import { BanksMapper } from '../mappers/banks.mapper';

@CommandHandler(CreateBanksCommand)
export class CreateBanksHandler implements ICommandHandler<CreateBanksCommand> {
  constructor(
    @Inject(BANKS_REPOSITORY)
    private readonly _banksRepository: BanksRepository,
  ) {}

  async execute(command: CreateBanksCommand) {
    const bank = BanksMapper.toEntity({
      bankName: command.bankName,
      description: command.description,
    });

    return this._banksRepository.create(bank);
  }
}
