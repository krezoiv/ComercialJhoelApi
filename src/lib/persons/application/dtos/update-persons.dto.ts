import {
  IsEmail,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class UpdatePersonDto {
  @IsOptional()
  @IsString()
  @Length(2, 50)
  firstName?: string;

  @IsOptional()
  @IsString()
  @Length(2, 50)
  lastName?: string;

  @IsOptional()
  @IsString()
  @Matches(/^\d{8}$/, {
    message:
      'Número de teléfono debe tener exactamente 8 dígitos o es invalido',
  })
  phoneNumber?: string;

  @IsOptional()
  @IsEmail({}, { message: 'Forma de correo inválido' })
  email?: string;
}
