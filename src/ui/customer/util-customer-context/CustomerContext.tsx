import { SearchByCustomer } from '@shared/types'
import { PropsWithChildren, createContext, useContext } from 'react'

interface CustomerContextType {
  page: number;
  searchBy: SearchByCustomer
  keyword: string;
}

const CustomerContext = createContext<CustomerContextType>({
  page: 1,
  searchBy: SearchByCustomer.name,
  keyword: '',
})

type ProviderProps = {
  page: number;
  searchBy: SearchByCustomer
  keyword: string;
}

const CustomerContextProvider = ({ children, ...value }: PropsWithChildren<ProviderProps>) => {

  return (
    <CustomerContext.Provider value={value}>
      {children}
    </CustomerContext.Provider>
  )
}

const useCustomerContext = () => useContext(CustomerContext)

export { CustomerContextProvider, useCustomerContext }
