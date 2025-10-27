/* eslint-disable @typescript-eslint/semi */
import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import classNames from "classnames/bind";
import useUserStore from "@zustand/useUserStore";
import { getUserInfo as getUserInfoAPI } from "@shared/api";
import styles from "./GNB.module.scss";
import { getAccessToken, clearAuth } from "@shared/auth";
import { useRouter } from "next/router";

const cx = classNames.bind(styles);

const GNB = () => {
  const router = useRouter();
  const user = useUserStore.use.user();
  const setUser = useUserStore.use.setUser();
  const {
    imageUrl,
    name,
    company: { companyName },
  } = user;

  useEffect(() => {
    let isCancelled = false;

    const getUserInfo = async () => {
      if (user.id !== -1) return;

      const token = getAccessToken();
      if (!token) return;

      try {
        const me = await getUserInfoAPI();
        if (!isCancelled && me) {
          setUser(me);
        }
      } catch (e: any) {
        if (e?.response?.status === 401) {
          // ✅ 토큰 만료 or 로그인 안 됨 → 쿠키/스토리지 정리 후 로그인 페이지로 이동
          clearAuth?.(); // accessToken, refreshToken 삭제 (deleteCookie 등)
          router.replace("/signin");
        } else {
          console.error(e);
        }
      }
    };

    getUserInfo();
    return () => {
      isCancelled = true;
    };
  }, [setUser, user.id, router]);

  return (
    <nav className={cx("container")}>
      <Link href="/">
        <Image
          src="/images/logo.png"
          alt="로고"
          width={130}
          height={32}
          priority
        />
      </Link>
      <Link href="/account" className={cx("profile")}>
        <Image
          src={imageUrl ?? "/images/default-profile.svg"}
          alt="프로필 이미지"
          width={36}
          height={36}
          className={cx("image")}
        />
        <div className={cx("text")}>
          <span className={cx("name")}>{name}</span>
          <span className={cx("company")}>{companyName}</span>
        </div>
      </Link>
    </nav>
  );
};

export default GNB;
