import { UserInfo } from '@shared/types'
import { create } from 'zustand'
import createSelectors from './util/createSelectors'

type UserState = {
  user: UserInfo
}

type UserAction = {
  setUser: (user: Partial<UserInfo>) => void
  resetUser: () => void
}

const initialUser: UserInfo = {
  id: -1,
  name: '',
  email: '',
  employeeNumber: '',
  phoneNumber: '',
  imageUrl: null,
  company: {
    companyName: '',
  },
  isAdmin: false,
}

const DEFAULT_PROPS: UserState = {
  user: initialUser,
}

const useUserStoreBase = create<UserState & UserAction>(
  (set) => ({
    ...DEFAULT_PROPS,
    setUser: (user) => set((state) => ({ user: { ...state.user, ...user } })),
    resetUser: () => set(() => ({ ...DEFAULT_PROPS })),
  }),
)

const useUserStore = createSelectors(useUserStoreBase)
export default useUserStore
