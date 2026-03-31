import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCustomersDto {
  @IsString()
  @IsNotEmpty({ message: 'Campo requerido' })
  personId!: string;
}
