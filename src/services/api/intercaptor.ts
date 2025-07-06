import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

function createApiInstance(config: AxiosRequestConfig): AxiosInstance {
  const instance = axios.create(config);

  instance.interceptors.request.use(
    (requestConfig: InternalAxiosRequestConfig) => requestConfig,
    error =>
      Promise.reject(
        new Error(error instanceof Error ? error.message : String(error)),
      ),
  );

  instance.interceptors.response.use(
    (response: AxiosResponse) => response,
    error =>
      Promise.reject(
        new Error(error instanceof Error ? error.message : String(error)),
      ),
  );

  return instance;
}

export const api1 = createApiInstance({
  baseURL: 'https://api1.example.com',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

export const api2 = createApiInstance({
  baseURL: 'https://api2.example.com',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});
