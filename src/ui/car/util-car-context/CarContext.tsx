import { CarStatusParam, SearchByCar } from '@shared/types'
import { PropsWithChildren, createContext, useContext } from 'react'

interface CarContextType {
  page: number;
  searchBy: SearchByCar
  keyword: string;
  status: CarStatusParam
}

const CarContext = createContext<CarContextType>({
  page: 1,
  searchBy: SearchByCar.carNumber,
  keyword: '',
  status: CarStatusParam.total,
})

type ProviderProps = {
  page: number;
  searchBy: SearchByCar
  keyword: string;
  status: CarStatusParam
}

const CarContextProvider = ({ children, ...value }: PropsWithChildren<ProviderProps>) => {

  return (
    <CarContext.Provider value={value}>
      {children}
    </CarContext.Provider>
  )
}

const useCarContext = () => useContext(CarContext)

export { CarContextProvider, useCarContext }
