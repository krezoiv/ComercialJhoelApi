import { Users } from 'src/lib/users/index-users-domain';

export interface AuthRepositoty {
  findByUserName(userName: string): Promise<Users>;
}
