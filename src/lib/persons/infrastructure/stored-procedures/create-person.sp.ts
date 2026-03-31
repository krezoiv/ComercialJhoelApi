import { Injectable } from '@nestjs/common';
import { SpExecutorService } from 'src/shared/database/sp-executor.service';
import {
  CreatePersonInput,
  CreatePersonResult,
} from '../types/create-person.type';

@Injectable()
export class CreatePersonSp {
  constructor(private readonly _spExecutor: SpExecutorService) {}

  async execute(params: CreatePersonInput): Promise<CreatePersonResult[]> {
    return this._spExecutor.execute<CreatePersonResult>`
    EXEC sp_create_person
      @first_name = ${params.firstName},
      @last_name = ${params.lastName},
      @phone_number = ${params.phoneNumber},
      @email = ${params.email}
    `;
  }
}
