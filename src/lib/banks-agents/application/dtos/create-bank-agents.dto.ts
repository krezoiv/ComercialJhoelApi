import { Type } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBankAgentsDto {
  @IsString()
  @IsNotEmpty({ message: 'Campo requerido' })
  customerId!: string;

  @IsString()
  @IsNotEmpty({ message: 'Campo requerido' })
  bankId!: string;

  @IsString()
  @IsNotEmpty({ message: 'Campo requerido' })
  userId!: string;

  @IsString()
  @IsNotEmpty({ message: 'Campo requerido' })
  description!: string;

  @Type(() => Number)
  @IsNotEmpty({ message: 'Campo requerido' })
  amount!: number;

  @IsString()
  @IsNotEmpty({ message: 'Campo requerido' })
  paymentDate!: string;
}
