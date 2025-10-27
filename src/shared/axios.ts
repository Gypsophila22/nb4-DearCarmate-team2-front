// /* eslint-disable comma-dangle */
// /* eslint-disable @typescript-eslint/semi */
// import axios, { AxiosError, AxiosInstance } from "axios";
// import { deleteCookie, getCookie } from "cookies-next";
// import { AxiosErrorData } from "./types";
// import { getAccessToken, setTokenCookies } from "./auth";

// declare module "axios" {
//   export interface InternalAxiosRequestConfig {
//     _retry?: boolean;
//   }
// }

// export const instance: AxiosInstance = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_BASE_URL,
//   timeout: 1000 * 60 * 5, // 5 minutes
// });

// export const setAuthorization = (accessToken: string) => {
//   if (!accessToken) {
//     delete instance.defaults.headers.common["Authorization"];
//     return;
//   }
//   instance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
// };

// let isLoggedOut = false;

// /** 탈퇴/로그아웃 직후에는 자동 리프레시 시도를 막기 위해 호출하세요. */
// export function markLoggedOut() {
//   isLoggedOut = true;
// }

// instance.interceptors.request.use(
//   (config) => {
//     const { method, url } = config;
//     console.log(`🚀 [API] ${method?.toUpperCase()} ${url} | Request`);

//     const accessToken = getAccessToken();
//     if (accessToken) {
//       // axios v1: headers is a plain object (string indexable)
//       (config.headers as any)["Authorization"] = `Bearer ${accessToken}`;
//     }

//     return config;
//   },
//   (error: AxiosError | Error): Promise<AxiosError> => {
//     return Promise.reject(error);
//   },
// );

// instance.interceptors.response.use(
//   (response) => {
//     const { method, url } = response.config;
//     const { status } = response;
//     console.log(`🚁 [API] ${method?.toUpperCase()} ${url} | Response ${status}`);
//     return response;
//   },
//   async (error: AxiosError<AxiosErrorData> | Error): Promise<AxiosError> => {
//     if (!axios.isAxiosError(error) || !error.config || !error.response) {
//       console.log(`🚨 [API] | Error ${error.message}`);
//       return Promise.reject(error);
//     }

//     const originalRequest = error.config;
//     const { method, url } = originalRequest;
//     const { status, statusText, data } = error.response;
//     const message = (data as any)?.message || error.message;

//     console.log(
//       `🚨 [API] ${method?.toUpperCase()} ${url} | Error ${status} ${statusText} | ${message}`,
//     );

//     // 401 처리: 로그아웃 상태거나 refresh 토큰이 없으면 리프레시 시도하지 않음
//     if (status === 401 && !originalRequest._retry) {
//       if (isLoggedOut) {
//         // 이미 로그아웃/탈퇴 플로우임 → 재발급 금지
//         return Promise.reject(error);
//       }

//       // cookies-next: string | undefined
//       const refreshToken = getCookie("refreshToken") as string | undefined;
//       if (!refreshToken) {
//         // 리프레시 토큰 없으면 로그인 화면으로
//         try {
//           deleteCookie("refreshToken");
//         } catch {}
//         setAuthorization("");
//         if (typeof window !== "undefined") window.location.href = "/signin";
//         return Promise.reject(error);
//       }

//       // 한 번만 재시도
//       originalRequest._retry = true;

//       try {
//         const { data: tokens } = await instance.post<{
//           accessToken: string;
//           refreshToken: string;
//         }>("/auth/refresh", { refreshToken });

//         const { accessToken: newAccessToken, refreshToken: newRefreshToken } = tokens;

//         // 쿠키/헤더 갱신
//         setTokenCookies(newAccessToken, newRefreshToken);
//         setAuthorization(newAccessToken);

//         // 원 요청 재전송
//         return instance(originalRequest);
//       } catch (refreshError) {
//         // 리프레시 실패 → 세션 정리 후 로그인 화면
//         try {
//           deleteCookie("refreshToken");
//         } catch {}
//         setAuthorization("");
//         if (typeof window !== "undefined") window.location.href = "/signin";
//         return Promise.reject(refreshError as AxiosError);
//       }
//     }

//     return Promise.reject(error);
//   },
// );
import axios, { AxiosError, AxiosInstance } from "axios";
import { deleteCookie, getCookie } from "cookies-next";
import { AxiosErrorData } from "./types";
import { getAccessToken, setTokenCookies } from "./auth";

declare module "axios" {
  export interface InternalAxiosRequestConfig {
    _retry?: boolean;
  }
}

/** 메인 인스턴스 */
export const instance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 1000 * 60 * 5, // 5분
});

/** 인터셉터 영향을 받지 않는 리프레시 전용 인스턴스(무한루프/중복 인터셉터 방지) */
const refreshClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 1000 * 30,
});

/** Authorization 헤더 설정/제거 도우미 */
export const setAuthorization = (accessToken?: string) => {
  if (accessToken) {
    instance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  } else {
    delete (instance.defaults.headers.common as any)["Authorization"];
  }
};

let isLoggedOut = false;

/** 탈퇴/로그아웃 직후에는 자동 리프레시 시도를 막기 위해 호출하세요. */
export function markLoggedOut() {
  isLoggedOut = true;
}

/** 요청 인터셉터 */
instance.interceptors.request.use(
  (config) => {
    const { method, url } = config;
    console.log(`🚀 [API] ${method?.toUpperCase()} ${url} | Request`);

    const accessToken = getAccessToken();
    if (accessToken) {
      // Axios v1 헤더 객체 호환
      if (typeof config.headers?.set === "function") {
        config.headers.set("Authorization", `Bearer ${accessToken}`);
      } else {
        (config.headers as any) = {
          ...(config.headers || {}),
          Authorization: `Bearer ${accessToken}`,
        };
      }
    }

    return config;
  },
  (error: AxiosError | Error): Promise<AxiosError> => {
    return Promise.reject(error);
  },
);

/** 응답 인터셉터 */
instance.interceptors.response.use(
  (response) => {
    const { method, url } = response.config;
    const { status } = response;
    console.log(`🚁 [API] ${method?.toUpperCase()} ${url} | Response ${status}`);
    return response;
  },
  async (error: AxiosError<AxiosErrorData> | Error): Promise<any> => {
    // AxiosError가 아니거나 기본 정보가 없으면 그대로 반환
    if (!axios.isAxiosError(error) || !error.config || !error.response) {
      console.log(`🚨 [API] | Error ${error instanceof Error ? error.message : "Unknown"}`);
      return Promise.reject(error);
    }

    const originalRequest = error.config;
    const status = error.response.status;
    const statusText = error.response.statusText;
    const message = (error.response.data as any)?.message || error.message;

    const rawUrl = originalRequest.url || "";
    // 절대/상대 URL 모두에서 pathname을 안전하게 추출
    const pathname = (() => {
      try {
        const base = instance.defaults.baseURL || "http://dummy.local";
        return new URL(rawUrl, base).pathname || rawUrl;
      } catch {
        return rawUrl;
      }
    })();

    console.log(
      `🚨 [API] ${originalRequest.method?.toUpperCase()} ${rawUrl} | Error ${status} ${statusText} | ${message}`,
    );

    // 인증 엔드포인트(로그인/리프레시/회원가입)는 리프레시 로직에서 제외
    const isAuthEndpoint = /^\/auth\/(login|refresh|signup)/.test(pathname);

    // 원 요청에 Authorization 헤더가 있었는지(토큰 기반 요청만 리프레시 시도)
    const headersAny = (originalRequest.headers || {}) as any;
    const hadAuthHeader = Boolean(
      headersAny.Authorization ||
        headersAny.authorization ||
        (typeof headersAny.get === "function" && headersAny.get("Authorization")),
    );

    // 리프레시 쿠키 존재 여부
    const hasRefreshCookie = !!getCookie("refreshToken");

    // ★ 여기서 가드: 로그인 실패(401) 같은 경우는 아래 if에 걸리지 않음
    if (
      status === 401 &&
      !originalRequest._retry &&
      !isAuthEndpoint &&
      hadAuthHeader &&
      hasRefreshCookie
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken = getCookie("refreshToken");
        const { data } = await refreshClient.post<{
          accessToken: string;
          refreshToken: string;
        }>("/auth/refresh", { refreshToken });

        const { accessToken: newAccessToken, refreshToken: newRefreshToken } = data;

        // 쿠키/디폴트 헤더 갱신
        setTokenCookies(newAccessToken, newRefreshToken);
        setAuthorization(newAccessToken);

        // 실패했던 원 요청 재시도
        return instance(originalRequest);
      } catch (refreshError) {
        // 리프레시 실패 시 정리만 하고, 리다이렉트는 호출자(UI)에서 판단하도록 위임
        deleteCookie("refreshToken");
        setAuthorization(undefined);
        return Promise.reject(refreshError);
      }
    }

    // 그 외 에러는 그대로 호출자에게 전달(로그인 401도 여기로 떨어져 UI에서 모달/알럿으로 표시 가능)
    return Promise.reject(error);
  },
);
