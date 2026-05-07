import { IsBoolean, IsDateString, IsNumber, IsUUID } from 'class-validator';

export class ProcessBankAgentItemDto {
  @IsUUID()
  id!: string;

  @IsNumber({}, { message: 'amount debe ser número' })
  amount!: number;

  @IsDateString()
  createdAt!: string;

  @IsBoolean()
  checked!: boolean;
}
