export interface IApiResponse<T> {
  count: number;
  items: T[];
  error?: boolean;
}
