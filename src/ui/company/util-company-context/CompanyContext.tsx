import { SearchByCompany } from '@shared/types'
import { PropsWithChildren, createContext, useContext } from 'react'

interface CompanyContextType {
  page: number;
  searchBy: SearchByCompany
  keyword: string;
}

const CompanyContext = createContext<CompanyContextType>({
  page: 1,
  searchBy: SearchByCompany.companyName,
  keyword: '',
})

type ProviderProps = {
  page: number;
  searchBy: SearchByCompany
  keyword: string;
}

const CompanyContextProvider = ({ children, ...value }: PropsWithChildren<ProviderProps>) => {

  return (
    <CompanyContext.Provider value={value}>
      {children}
    </CompanyContext.Provider>
  )
}

const useCompanyContext = () => useContext(CompanyContext)

export { CompanyContextProvider, useCompanyContext }
