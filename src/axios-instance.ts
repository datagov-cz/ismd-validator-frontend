import Axios, { AxiosRequestConfig } from 'axios';

// All requests go through the Next.js BFF route handler at /api/backend/*,
// which reads BE_URL at request time and proxies to the internal backend
// ingress. The browser never sees BE_URL.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '/validujeme';

export const AXIOS_INSTANCE = Axios.create({
  baseURL: `${basePath}/api/backend`,
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
