import Axios, { AxiosRequestConfig } from 'axios';
import getConfig from 'next/config';

// Get runtime config
const { publicRuntimeConfig } = getConfig() || { publicRuntimeConfig: {} };

// Log the configuration for debugging
if (typeof window !== 'undefined') {
  console.log('Backend URL from config:', publicRuntimeConfig?.backendUrl);
}

// Use the backend URL from config or fall back to environment variable or localhost
export const AXIOS_INSTANCE = Axios.create({
  baseURL: publicRuntimeConfig.backendUrl || 'http://localhost:8080',
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
