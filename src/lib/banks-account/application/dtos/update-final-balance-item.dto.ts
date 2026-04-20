import { IsNumber, IsString, Min } from 'class-validator';

export class UpdateFinalBalanceItemDto {
  @IsString()
  accountNumber!: string;

  @IsNumber()
  @Min(0, { message: 'Final balance cannot be negative' })
  finalBalance!: number;
}
