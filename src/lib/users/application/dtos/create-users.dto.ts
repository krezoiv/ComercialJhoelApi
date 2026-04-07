import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateUsersDto {
  @IsString()
  @IsNotEmpty({ message: 'Usuario es requerido' })
  userName!: string;

  @IsString()
  @IsNotEmpty({ message: 'Nombre es requerido' })
  password!: string;

  @IsUUID()
  @IsNotEmpty()
  rolId!: string;

  @IsUUID()
  @IsNotEmpty()
  personId!: string;
}
