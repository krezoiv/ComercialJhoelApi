import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateBanksDto {
  @IsString()
  @IsNotEmpty({ message: 'Nombre de banco es requerido' })
  @Length(2, 75)
  bankName!: string;

  @IsString()
  description!: string;
}
