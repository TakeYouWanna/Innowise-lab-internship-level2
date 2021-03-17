export interface ApiError<T = any> {
  [key: string]: any;

  message: string;
  error?: T | null;
}
