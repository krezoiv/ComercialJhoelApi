import { Injectable } from '@nestjs/common';
import { SpExecutorService } from 'src/shared/database/sp-executor.service';
import { LoginUserRsult } from '../types/login-user.type';

@Injectable()
export class LoginUserSp {
  constructor(private readonly _spExecutor: SpExecutorService) {}

  async execute(userName: string): Promise<LoginUserRsult[]> {
    return this._spExecutor.execute<LoginUserRsult>`
    EXEC dbo.sp_login_user
    @username = ${userName}
  `;
  }
}
