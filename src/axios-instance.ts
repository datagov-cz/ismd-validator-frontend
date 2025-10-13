import Axios, { AxiosRequestConfig } from 'axios';

export const AXIOS_INSTANCE = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_BE_URL,
});

// Interceptor to dynamically set protocol AND hostname based on current page access
AXIOS_INSTANCE.interceptors.request.use((config) => {
  if (typeof window !== 'undefined' && config.baseURL) {
    const protocol = window.location.protocol;
    const currentHost = window.location.hostname;
    
    // Check if user is accessing via public IP address (IPv4 or IPv6, excludes private ranges)
    const isIpv4 = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(currentHost);
    const isPrivateIpv4 = /^(?:10|127|172\.(?:1[6-9]|2[0-9]|3[01])|192\.168)\./.test(currentHost);
    const isIpv6 = /^(?:[0-9a-fA-F]{0,4}:){2,7}[0-9a-fA-F]{0,4}$/.test(currentHost);
    const isPrivateIpv6 = /^(?:fe80:|::1$|fc00:|fd00:)/.test(currentHost); // Link-local, loopback, ULA
    
    const isPublicIp = ((isIpv4 && !isPrivateIpv4) || (isIpv6 && !isPrivateIpv6)) && 
                       currentHost !== 'localhost';
    
    let backendHost = config.baseURL;
    
    // If frontend accessed via public IP, use IP for backend; otherwise use configured domain
    if (isPublicIp) {
      // User accessed via public IP - use same IP for backend (shares App Gateway)
      backendHost = currentHost;
    }
    // else: use the configured hostname from env var (domain or localhost)
    
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
