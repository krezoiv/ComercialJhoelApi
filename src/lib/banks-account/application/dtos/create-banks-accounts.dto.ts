import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBanksAccountsDto {
  @Type(() => Number)
  @IsNumber({}, { message: 'Balance Inicial debe ser numérico' })
  @IsNotEmpty({ message: 'Balance Inicial es requerido' })
  initialBalance!: number;

  @Type(() => Number)
  @IsNumber({}, { message: 'Balance Inicial debe ser numérico' })
  @IsNotEmpty({ message: 'Balance final es requerido' })
  finalBalance!: number;

  @IsString()
  @IsNotEmpty({ message: 'Banco es requerido' })
  bankId!: string;

  @IsString()
  @IsNotEmpty({ message: 'Tipo de cuenta es requerido' })
  accountTypeId!: string;

  @IsString()
  @IsNotEmpty({ message: 'Número de cuenta es requerido' })
  bankAccountNumber!: string;

  @IsString()
  @IsNotEmpty({ message: 'Nombre de cuenta es requerido' })
  bankAccountName!: string;
}
