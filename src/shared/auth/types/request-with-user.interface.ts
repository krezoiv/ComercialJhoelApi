export interface RequestWithUser extends Request {
  user: {
    id: string;
    userName?: string;
    rol?: string;
  };
}
