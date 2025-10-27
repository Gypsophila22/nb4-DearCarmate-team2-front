// import { UserInfo } from '@shared/types'
// import { create } from 'zustand'
// import createSelectors from './util/createSelectors'

// type UserState = {
//   user: UserInfo
// }

// type UserAction = {
//   setUser: (user: Partial<UserInfo>) => void
//   resetUser: () => void
// }

// const initialUser: UserInfo = {
//   id: -1,
//   name: '',
//   email: '',
//   employeeNumber: '',
//   phoneNumber: '',
//   imageUrl: null,
//   company: {
//     companyName: '',
//   },
//   isAdmin: false,
// }

// const DEFAULT_PROPS: UserState = {
//   user: initialUser,
// }

// const useUserStoreBase = create<UserState & UserAction>(
//   (set) => ({
//     ...DEFAULT_PROPS,
//     setUser: (user) => set((state) => ({ user: { ...state.user, ...user } })),
//     resetUser: () => set(() => ({ ...DEFAULT_PROPS })),
//   }),
// )

// const useUserStore = createSelectors(useUserStoreBase)
// export default useUserStore
import { UserInfo } from "@shared/types";
import { create } from "zustand";
import createSelectors from "./util/createSelectors";

type UserState = {
  user: UserInfo;
};

type UserAction = {
  setUser: (user: Partial<UserInfo>) => void;
  resetUser: () => void;
  logout: () => void;
};

const initialUser: UserInfo = {
  id: -1,
  name: "",
  email: "",
  employeeNumber: "",
  phoneNumber: "",
  imageUrl: null,
  company: {
    companyName: "",
  },
  isAdmin: false,
};

const DEFAULT_PROPS: UserState = {
  user: initialUser,
};

const useUserStoreBase = create<UserState & UserAction>((set) => ({
  ...DEFAULT_PROPS,

  setUser: (user) => set((state) => ({ user: { ...state.user, ...user } })),

  resetUser: () => set(() => ({ ...DEFAULT_PROPS })),

  logout: () => {
    // 1) 클라이언트 보관 토큰/세션 정리
    try {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      sessionStorage.removeItem("accessToken");
      sessionStorage.removeItem("refreshToken");
      // 비(HTTPOnly) 쿠키로 토큰을 쓴 경우 대비
      document.cookie = "accessToken=; Max-Age=0; path=/";
      document.cookie = "refreshToken=; Max-Age=0; path=/";
    } catch {
      // storage 접근 불가해도 그냥 무시
    }

    // 2) 스토어 상태 초기화
    set(() => ({ ...DEFAULT_PROPS }));
  },
}));

const useUserStore = createSelectors(useUserStoreBase);
export default useUserStore;

// 필요시 컴포넌트 밖(비리액트 영역)에서 강제 초기화할 수 있게 헬퍼도 노출
export function hardResetUserStore() {
  try {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");
    document.cookie = "accessToken=; Max-Age=0; path=/";
    document.cookie = "refreshToken=; Max-Age=0; path=/";
  } catch {}
  useUserStoreBase.setState({ ...DEFAULT_PROPS });
}
