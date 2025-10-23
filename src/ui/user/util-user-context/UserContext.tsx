import { SearchByUser } from '@shared/types'
import { PropsWithChildren, createContext, useContext } from 'react'

interface UserContextType {
  page: number;
  searchBy: SearchByUser
  keyword: string;
}

const UserContext = createContext<UserContextType>({
  page: 1,
  searchBy: SearchByUser.companyName,
  keyword: '',
})

type ProviderProps = {
  page: number;
  searchBy: SearchByUser
  keyword: string;
}

const UserContextProvider = ({ children, ...value }: PropsWithChildren<ProviderProps>) => {

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}

const useUserContext = () => useContext(UserContext)

export { UserContextProvider, useUserContext }
