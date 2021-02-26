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

  constructor(url: string, sessionHeaders = {}) {
    this.api = axios.create({
      baseURL: url,
      headers: {
        'Content-Type': 'application/json',
        ...sessionHeaders
      },
      responseType: 'json'
    });
  }

  public setAuthorization(token: string): void {
    this.api.defaults.headers.common.Authorization = `Bearer ${token}`;
  }

  public removeAuthorization(): void {
    delete this.api.defaults.headers.common.Authorization;
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


const TwitchSession = new Session('https://api.twitch.tv/helix', { 'Client-Id': process.env.TWITCH_APP_ID });

export const getTwitchToken = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    axios.post(`https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_APP_ID}&client_secret=${process.env.TWITCH_APP_SECRET}&grant_type=client_credentials`)
      .then(res => {
        console.log('Token response:', res);
        TwitchSession.setAuthorization(res.data.access_token);
        resolve();
      })
      .catch(err => {
        reject(err);
      });
  });
};

export { openDotaSession, TwitchSession };
