import axios, { AxiosError, AxiosInstance } from 'axios'
import { deleteCookie, getCookie } from 'cookies-next'
import { AxiosErrorData } from './types'
import { getAccessToken, setTokenCookies } from './auth'

declare module 'axios' {
  export interface InternalAxiosRequestConfig {
    _retry?: boolean
  }
}

export const instance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 1000 * 60 * 5, // 5 minutes
})

export const setAuthorization = (accessToken: string) => {
  instance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
}

instance.interceptors.request.use(
  (config) => {
    const { method, url } = config
    console.log(`🚀 [API] ${method?.toUpperCase()} ${url} | Request`)

    const accessToken = getAccessToken()
    if (accessToken) {
      config.headers.set('Authorization', `Bearer ${accessToken}`)
    }

    return config
  },

  /**
   * request 에러 시 작업
   */
  (error: AxiosError | Error): Promise<AxiosError> => {
    return Promise.reject(error)
  },
)

instance.interceptors.response.use(
  (response) => {
    /**
     * http status가 20X이고, http response가 then으로 넘어가기 직전 호출
     */
    const { method, url } = response.config
    const { status } = response
    console.log(`🚁 [API] ${method?.toUpperCase()} ${url} | Response ${status}`)

    return response
  },
  async (error: AxiosError<AxiosErrorData> | Error): Promise<AxiosError> => {
    /**
     * AxiosError가 아닌 Error는 그대로 reject
     */
    if (!axios.isAxiosError(error) || !error.config || !error.response) {
      console.log(`🚨 [API] | Error ${error.message}`)
      return Promise.reject(error)
    }

    /**
     * http status가 20X가 아닌 경우 로그 출력
     */
    const { method, url } = error.config
    const { status, statusText, data } = error.response
    const message = data?.message || error.message

    console.log(
      `🚨 [API] ${method?.toUpperCase()} ${url} | Error ${status} ${statusText} | ${message}`,
    )

    /**
     * 401 에러 발생 시 토큰 재발급 후 한 번만 재시도하고
     * 실패하면 로그인 페이지로 이동
     */
    const originalRequest = error.config
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const refreshToken = getCookie('refreshToken')
        const { data } = await instance.post<{
          accessToken: string
          refreshToken: string
        }>('/auth/refresh', { refreshToken })
        const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
          data
        setTokenCookies(newAccessToken, newRefreshToken)
        return instance(originalRequest)
      } catch (refreshError) {
        deleteCookie('refreshToken')
        setAuthorization('')
        location.href = '/signin'
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  },
)
