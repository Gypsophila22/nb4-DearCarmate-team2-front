import { SearchByContract } from '@shared/types'
import { PropsWithChildren, createContext, useContext } from 'react'

interface ContractContextType {
  searchBy: SearchByContract
  keyword: string;
}

const ContractContext = createContext<ContractContextType>({
  searchBy: SearchByContract.customerName,
  keyword: '',
})

type ProviderProps = {
  searchBy: SearchByContract
  keyword: string;
}

const ContractContextProvider = ({ children, ...value }: PropsWithChildren<ProviderProps>) => {

  return (
    <ContractContext.Provider value={value}>
      {children}
    </ContractContext.Provider>
  )
}

const useContractContext = () => useContext(ContractContext)

export { ContractContextProvider, useContractContext }
