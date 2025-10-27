/* eslint-disable @typescript-eslint/semi */
import { getCookie, setCookie, deleteCookie } from "cookies-next";
import { setAuthorization, markLoggedOut } from "./axios";

export const getAccessToken = () => getCookie("accessToken");

export const setTokenCookies = (accessToken: string, refreshToken: string) => {
  setCookie("accessToken", accessToken, {
    maxAge: 60 * 60, // 1시간
    secure: true,
    sameSite: "strict",
  });
  setCookie("refreshToken", refreshToken, {
    maxAge: 60 * 60 * 24 * 7, // 7일
    secure: true,
    sameSite: "strict",
  });
};

export const clearTokenCookies = () => {
  deleteCookie("accessToken");
  deleteCookie("refreshToken");
};

export function clearAuth() {
  deleteCookie("accessToken");
  deleteCookie("refreshToken");
  setAuthorization("");
  markLoggedOut();
}
