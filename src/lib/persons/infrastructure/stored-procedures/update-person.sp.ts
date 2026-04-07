import { Injectable } from '@nestjs/common';
import { UpdatePersonInput, UpdatePersonResult } from '../index-infrastructure';
import { SpExecutorService } from 'src/shared/database/index-database';

@Injectable()
export class UpdatePersonSp {
  constructor(private readonly spExecutor: SpExecutorService) {}

  async execute(params: UpdatePersonInput): Promise<UpdatePersonResult[]> {
    return this.spExecutor.execute<UpdatePersonResult>`
  EXEC sp_update_person
    @id = ${params.id},
    @first_name = ${params.firstName ?? null},
    @last_name = ${params.lastName ?? null},
    @phone_number = ${params.phoneNumber ?? null},
    @email = ${params.email ?? null}
`;
  }
}
