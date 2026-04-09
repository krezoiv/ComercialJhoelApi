import { Injectable } from '@nestjs/common';
import { AuthRepositoty } from '../../domain/index-auth-domain';
import { LoginUserSp } from '../stored-procedure/login-user.sp';
import {
  PasswordHash,
  UserId,
  Username,
  Users,
} from 'src/lib/users/index-users-domain';
import { PersonId } from 'src/lib/persons/domain/index-domain';
import {
  Description,
  RolId,
  RolName,
  Rols,
} from 'src/lib/rols/domain/index-rols-domain';

@Injectable()
export class PrismaAuthRepository implements AuthRepositoty {
  constructor(private readonly _loginUserSp: LoginUserSp) {}
  async findByUserName(userName: string): Promise<Users> {
    const result = await this._loginUserSp.execute(userName);

    const data = result[0];
    console.log('ID:', data.id);
    console.log('ROLE ID:', data.rolId);
    console.log('PERSON ID:', data.personId);

    const rol = new Rols(
      new RolId(data.id),
      new RolName(data.rol),
      new Description(data.description),
      new Date(data.createdAt),
      new Date(data.updatedAt),
    );

    return new Users(
      new UserId(String(data.id)),
      new RolId(data.rolId),
      new PersonId(data.personId),
      new Username(data.userName),
      new PasswordHash(data.passwordHash),
      new Date(data.createdAt),
      new Date(data.updatedAt),
      data.deletedAt ? new Date(data.deletedAt) : null,
      rol, // 👈 AQUÍ VA EL FIX
      undefined,
    );
  }
}
