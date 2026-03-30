export interface BaseAudit {
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface BaseId {
  id: string;
}

export interface SpResponse {
  code: number;
  message: string;
}
