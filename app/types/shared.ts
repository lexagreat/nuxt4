export interface IFetchOptions<T> {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  body?: T;
  headers?: Record<string, string>;
  query?: Record<string, string>;
  params?: Record<string, string>;
  baseURL?: string;
  credentials?: RequestCredentials;
}
