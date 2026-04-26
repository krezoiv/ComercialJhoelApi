export interface RequestWithUser extends Request {
  user: {
    id: string;
    userName?: string;
    role?: string;
  };
}
