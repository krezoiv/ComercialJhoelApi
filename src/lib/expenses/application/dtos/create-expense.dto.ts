import { Type } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateExpenseDto {
  @IsString()
  @IsNotEmpty({ message: 'Campo requerido' })
  customerId!: string;

  @IsString()
  @IsNotEmpty({ message: 'Campo requerido' })
  expenseDescription!: string;

  @Type(() => Number)
  @IsNotEmpty({ message: 'Campo requerido' })
  expenseAmount!: number;

  @IsString()
  @IsNotEmpty({ message: 'Campo requerido' })
  expenseType!: string;
}
