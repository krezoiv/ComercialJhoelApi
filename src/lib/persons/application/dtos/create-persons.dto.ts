import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class CreatePersonsDto {
  @IsString()
  @IsNotEmpty({ message: 'Primer nombre es requerido' })
  @Length(2, 50, { message: 'Primer Nombre debe ser entre 2 y 50 caracteres' })
  firstName!: string;

  @IsString()
  @IsNotEmpty({ message: 'Apellido es requerido' })
  @Length(2, 50)
  lastName!: string;

  @IsString()
  @Matches(/^\d{8}$/, {
    message: 'Invalid phone number format',
  })
  phoneNumber!: string;

  @IsEmail({}, { message: 'Forma de correo inválido' })
  email!: string;
}
