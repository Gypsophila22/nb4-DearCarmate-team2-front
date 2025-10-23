import { getCookie, setCookie, deleteCookie } from 'cookies-next'

export const getAccessToken = () => getCookie('accessToken')

export const setTokenCookies = (accessToken: string, refreshToken: string) => {
  setCookie('accessToken', accessToken, {
    maxAge: 60 * 60, // 1시간
    secure: true,
    sameSite: 'strict',
  })
  setCookie('refreshToken', refreshToken, {
    maxAge: 60 * 60 * 24 * 7, // 7일
    secure: true,
    sameSite: 'strict',
  })
}

export const clearTokenCookies = () => {
  deleteCookie('accessToken')
  deleteCookie('refreshToken')
}
