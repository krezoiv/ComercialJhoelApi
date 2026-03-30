export interface BaseResponse<T> {
  success: boolean;
  message: string;
  data: T;
  meta?: Record<string, any>;
}
