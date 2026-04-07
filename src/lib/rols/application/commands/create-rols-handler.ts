import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreateRolsCommand } from './create-rols.command';
import { RolsMapper } from '../index-rols-application';
import {
  ROLS_REPOSITORY,
  RolsRepository,
} from '../../domain/index-rols-domain';

@CommandHandler(CreateRolsCommand)
export class CreateRolsHandler implements ICommandHandler<CreateRolsCommand> {
  constructor(
    @Inject(ROLS_REPOSITORY)
    private readonly _rolsRepository: RolsRepository,
  ) {}

  async execute(command: CreateRolsCommand) {
    const rol = RolsMapper.toEntity({
      name: command.name,
      description: command.description,
    });

    return this._rolsRepository.create(rol);
  }
}
