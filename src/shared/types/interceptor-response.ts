export interface InterceptorResponse<T = unknown> {
  data?: T;
  meta?: Record<string, any>;
}
