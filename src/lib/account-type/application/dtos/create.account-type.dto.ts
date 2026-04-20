import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateAccountTypeDto {
  @IsString()
  @IsNotEmpty({ message: 'Nombre de tipo de cuenta es requerido' })
  @Length(2, 75)
  accountTypeName!: string;
}
