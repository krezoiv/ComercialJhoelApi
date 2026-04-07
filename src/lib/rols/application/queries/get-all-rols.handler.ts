import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetAllRolsQuery } from './get-all-rols.query';
import {
  ROLS_REPOSITORY,
  RolsRepository,
} from '../../domain/index-rols-domain';
import { RolsMapper } from '../index-rols-application';

@QueryHandler(GetAllRolsQuery)
export class GetAllRolsHandler implements IQueryHandler<GetAllRolsQuery> {
  constructor(
    @Inject(ROLS_REPOSITORY)
    private readonly _rolsRepository: RolsRepository,
  ) {}
  async execute() {
    const rols = await this._rolsRepository.findAll();
    return rols.map((rols) => RolsMapper.toResponseDto(rols));
  }
}
