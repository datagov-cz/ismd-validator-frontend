import Axios, { AxiosRequestConfig } from 'axios';

export const AXIOS_INSTANCE = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_BE_URL,
});

// Interceptor to dynamically set protocol AND hostname based on current page access
AXIOS_INSTANCE.interceptors.request.use((config) => {
  if (typeof window !== 'undefined' && config.baseURL) {
    const protocol = window.location.protocol;
    const currentHost = window.location.hostname;
    
    // Always use the same host for backend as frontend to ensure protocol/cert consistency
    // Only exception is localhost (for local development with separate backend)
    let backendHost = config.baseURL;
    
    if (currentHost !== 'localhost' && currentHost !== '127.0.0.1') {
      // User accessed via App Gateway (IP or domain) - use same host for backend
      backendHost = currentHost;
    }
    // else: use the configured hostname from env var (for localhost development)
    
    // Build final URL with protocol
    if (backendHost.startsWith('http://') || backendHost.startsWith('https://')) {
      config.baseURL = backendHost.replace(/^https?:\/\//, `${protocol}//`);
    } else {
      config.baseURL = `${protocol}//${backendHost}`;
    }
  }
  return config;
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