import { IsUUID } from 'class-validator';

export class GetBankAgentsByCustomerIdDto {
  @IsUUID()
  id!: string;
}
