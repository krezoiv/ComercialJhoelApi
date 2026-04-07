import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRolsDto {
  @IsString()
  @IsNotEmpty({ message: 'Nombre es requerido' })
  name!: string;

  @IsString()
  @IsNotEmpty({ message: 'Descripción es requerida' })
  description!: string;
}
