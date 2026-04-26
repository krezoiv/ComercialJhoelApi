export interface JwtPayload {
  sub: string;
  userName: string;
  rol: string;
  firstName?: string;
  lastName?: string;
}
