import type { IFetchOptions } from '~/types';

export function fetcher<T>(request: string, opts?: IFetchOptions<T>) {
  const config = useRuntimeConfig();

  return useFetch<T>(request, {
    ...opts,
    baseURL: config.public.baseURL,
  });
}
