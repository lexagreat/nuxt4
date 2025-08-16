export function useBaseFetch<T>(request: string, opts?: any) {
  const config = useRuntimeConfig();

  return useFetch<T>(request, {
    baseURL: config.public.baseURL,
    ...opts,
  });
}
