import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class CreatePersonsDto {
  @IsString()
  @IsNotEmpty({ message: 'Nombre es requerido' })
  @Length(2, 50)
  firstName!: string;

  @IsString()
  @IsNotEmpty({ message: 'Apellido es requerido' })
  @Length(2, 50)
  lastName!: string;

  @IsString()
  @Matches(/^\d{8}$/, {
    message:
      'Número de teléfono debe tener exactamente 8 dígitos o es invalido',
  })
  phoneNumber!: string;

  @IsEmail({}, { message: 'Forma de correo inválido' })
  email!: string;
}
