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
    // Logic updated: Preserve the PATH from the configured baseURL if present
    let backendPath = '';
    
    // Extract path from original baseURL if possible
    if (config.baseURL) {
      try {
        // Check if it's a full URL
        if (config.baseURL.startsWith('http')) {
           const url = new URL(config.baseURL);
           backendPath = url.pathname; 
        } else if (config.baseURL.startsWith('/')) {
           // It's already a relative path
           backendPath = config.baseURL;
        }
      } catch {
        // Ignore parsing errors
      }
    }
    
    // Clean up path: remove trailing slash if not root, ensure leading slash
    if (backendPath === '/') backendPath = '';
    if (backendPath && !backendPath.startsWith('/')) backendPath = '/' + backendPath;
    // Remove potential double slash if backendPath starts with / and we append
    
    let backendHost = '';
    
    if (currentHost !== 'localhost' && currentHost !== '127.0.0.1') {
      // User accessed via App Gateway (IP or domain) - use current host + preserved path
      backendHost = currentHost;
      
      // Build final URL with protocol
      // Note: window.location.hostname does NOT include port. App Gateway uses standard ports.
      config.baseURL = `${protocol}//${backendHost}${backendPath}`;
      
    } else {
      // Localhost development - keep original config
      // No change needed to config.baseURL
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