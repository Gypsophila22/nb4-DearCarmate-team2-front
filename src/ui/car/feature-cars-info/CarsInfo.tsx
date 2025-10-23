import classNames from 'classnames/bind'
import styles from './CarsInfo.module.scss'
import useCars from '../data-access-cars/useCars'
import { CarStatusParam, SearchByCar } from '@shared/types'
import CarsInfoTable from '../ui-cars-info-table/CarsInfoTable'
import Pagination from '@ui/shared/pagination/Pagination'
import { CarContextProvider } from '../util-car-context/CarContext'
import Loader from '@ui/shared/loader/Loader'

const cx = classNames.bind(styles)

type CarsInfoProps = {
  searchBy: SearchByCar
  keyword: string
  page: number
  status: CarStatusParam
}

const CarsInfo = ({ keyword, page, searchBy, status }: CarsInfoProps) => {
  const { data: carsData, isLoading } = useCars({ keyword, page, searchBy, status })
  if (isLoading || !carsData) return (
    <div className={cx('loading')}>
      <Loader />
    </div>
  )
  const { currentPage, data, totalPages } = carsData

  return (
    <div>
      <CarContextProvider page={page} searchBy={searchBy} keyword={keyword} status={status}>
        <CarsInfoTable data={data} />
      </CarContextProvider>
      {data.length > 0 && (
        <div className={cx('paginationWrapper')}>
          <Pagination currentPage={currentPage} totalPages={totalPages} />
        </div>
      )}
    </div>
  )
}

export default CarsInfo
