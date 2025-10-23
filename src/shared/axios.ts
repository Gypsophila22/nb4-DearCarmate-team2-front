/* eslint-disable comma-dangle */
/* eslint-disable @typescript-eslint/semi */
import axios, { AxiosError, AxiosInstance } from 'axios';
import { deleteCookie, getCookie } from 'cookies-next';
import { AxiosErrorData } from './types';
import { getAccessToken, setTokenCookies } from './auth';

declare module 'axios' {
  export interface InternalAxiosRequestConfig {
    _retry?: boolean;
  }
}

export const instance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 1000 * 60 * 5, // 5 minutes
});

export const setAuthorization = (accessToken: string) => {
  if (!accessToken) {
    delete instance.defaults.headers.common['Authorization'];
    return;
  }
  instance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
};

let isLoggedOut = false;

/** 탈퇴/로그아웃 직후에는 자동 리프레시 시도를 막기 위해 호출하세요. */
export function markLoggedOut() {
  isLoggedOut = true;
}

instance.interceptors.request.use(
  (config) => {
    const { method, url } = config;
    console.log(`🚀 [API] ${method?.toUpperCase()} ${url} | Request`);

    const accessToken = getAccessToken();
    if (accessToken) {
      // axios v1: headers is a plain object (string indexable)
      (config.headers as any)['Authorization'] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error: AxiosError | Error): Promise<AxiosError> => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    const { method, url } = response.config;
    const { status } = response;
    console.log(
      `🚁 [API] ${method?.toUpperCase()} ${url} | Response ${status}`
    );
    return response;
  },
  async (error: AxiosError<AxiosErrorData> | Error): Promise<AxiosError> => {
    if (!axios.isAxiosError(error) || !error.config || !error.response) {
      console.log(`🚨 [API] | Error ${error.message}`);
      return Promise.reject(error);
    }

    const originalRequest = error.config;
    const { method, url } = originalRequest;
    const { status, statusText, data } = error.response;
    const message = (data as any)?.message || error.message;

    console.log(
      `🚨 [API] ${method?.toUpperCase()} ${url} | Error ${status} ${statusText} | ${message}`
    );

    // 401 처리: 로그아웃 상태거나 refresh 토큰이 없으면 리프레시 시도하지 않음
    if (status === 401 && !originalRequest._retry) {
      if (isLoggedOut) {
        // 이미 로그아웃/탈퇴 플로우임 → 재발급 금지
        return Promise.reject(error);
      }

      // cookies-next: string | undefined
      const refreshToken = getCookie('refreshToken') as string | undefined;
      if (!refreshToken) {
        // 리프레시 토큰 없으면 로그인 화면으로
        try {
          deleteCookie('refreshToken');
        } catch {}
        setAuthorization('');
        if (typeof window !== 'undefined') window.location.href = '/signin';
        return Promise.reject(error);
      }

      // 한 번만 재시도
      originalRequest._retry = true;

      try {
        const { data: tokens } = await instance.post<{
          accessToken: string;
          refreshToken: string;
        }>('/auth/refresh', { refreshToken });

        const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
          tokens;

        // 쿠키/헤더 갱신
        setTokenCookies(newAccessToken, newRefreshToken);
        setAuthorization(newAccessToken);

        // 원 요청 재전송
        return instance(originalRequest);
      } catch (refreshError) {
        // 리프레시 실패 → 세션 정리 후 로그인 화면
        try {
          deleteCookie('refreshToken');
        } catch {}
        setAuthorization('');
        if (typeof window !== 'undefined') window.location.href = '/signin';
        return Promise.reject(refreshError as AxiosError);
      }
    }

    return Promise.reject(error);
  }
);
