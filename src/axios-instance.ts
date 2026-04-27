import Axios, { AxiosRequestConfig } from 'axios';

// All requests go through the Next.js BFF: relative paths under the app's basePath
// are rewritten server-side (next.config.mjs) to the internal backend ingress.
export const AXIOS_INSTANCE = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_PATH || '/validujeme',
});

export const axiosInstance = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig,
): Promise<T> => {
  const source = Axios.CancelToken.source();
  const promise = AXIOS_INSTANCE({
    ...config,
    ...options,
    paramsSerializer: { indexes: null },
    cancelToken: source.token,
  }).then(({ data }) => data);

  // @ts-expect-error -> cancel does not exist on Promise type
  promise.cancel = () => {
    source.cancel('Query was cancelled');
  };

  return promise;
};
