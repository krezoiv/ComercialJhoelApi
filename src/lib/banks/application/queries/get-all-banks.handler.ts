import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  BANKS_REPOSITORY,
  BanksRepository,
} from '../../domain/index-banks-domain';
import { BanksMapper } from '../index-banks-application';
import { GetAllBanksQuery } from './get-all-banks.query';

@QueryHandler(GetAllBanksQuery)
export class GetAllBanksHandler implements IQueryHandler<GetAllBanksQuery> {
  constructor(
    @Inject(BANKS_REPOSITORY)
    private readonly _banksRepository: BanksRepository,
  ) {}

  async execute() {
    const banks = await this._banksRepository.findAll();
    return banks.map((banks) => BanksMapper.toResponseDto(banks));
  }
}
