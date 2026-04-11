import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import * as bcrypt from 'bcrypt';
import { LoginQuery } from '../index-auth-application';
import { JwtService } from '@nestjs/jwt';
import { Inject } from '@nestjs/common';
import { AuthRepositoty } from '../../domain/index-auth-domain';
import { RolsList } from 'src/shared/auth/index-shared -auth';

@QueryHandler(LoginQuery)
export class LoginHandler implements IQueryHandler<LoginQuery> {
  constructor(
    @Inject('AuthRepository')
    private readonly _authRepository: AuthRepositoty,

    private readonly _jwtService: JwtService,
  ) {}

  async execute(query: LoginQuery) {
    const user = await this._authRepository.findByUserName(query.userName);
    console.log('ROLE:');

    if (!user) {
      throw new Error('Usuario no existe');
    }

    const userIsValid = await bcrypt.compare(
      query.password,
      user.passwordHash.value,
    );

    if (!userIsValid) {
      throw new Error('Credenciales incorrectas');
    }

    const token = this._jwtService.sign({
      sub: user.id.value,
      userName: user.userName.value,
      rol: user.rols?.rolName.value as RolsList,
    });

    return {
      access_token: token,
    };
  }
}
