/* eslint-disable @typescript-eslint/ban-types */
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

interface BodyRequestConfig {
  data?: object;
  config?: AxiosRequestConfig;
}

interface BodyLessRequestConfig {
  params?: object;
  config?: AxiosRequestConfig;
}

class Session {
  private api: AxiosInstance;

  constructor(url: string) {
    this.api = axios.create({
      baseURL: url,
      headers: {
        'Content-Type': 'application/json'
      },
      responseType: 'json'
    });
  }

  public async get<T>(
    url: string,
    { params, config }: BodyLessRequestConfig = { config: {} }
  ): Promise<T> {
    const res = await this.api.get(url, {
      params,
      ...config
    });
    return res.data as T;
  }

  public async post<T>(
    url: string,
    { data, config }: BodyRequestConfig = { config: {} }
  ): Promise<T> {
    const res = await this.api.post(url, data, config);
    return res.data as T;
  }

  public async put<T>(
    url: string,
    { data, config }: BodyRequestConfig = { config: {} }
  ): Promise<T> {
    const res = await this.api.put(url, data, config);
    return res.data as T;
  }

  public async delete<T>(
    url: string,
    { params, config }: BodyLessRequestConfig = { config: {} }
  ): Promise<T> {
    const res = await this.api.delete(url, {
      params,
      ...config
    });
    return res.data as T;
  }
}

const openDotaSession = new Session('https://api.opendota.com/api');

export { openDotaSession };
