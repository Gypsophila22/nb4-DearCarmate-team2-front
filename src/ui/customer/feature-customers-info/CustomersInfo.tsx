import classNames from 'classnames/bind'
import styles from './CustomersInfo.module.scss'
import { SearchByCustomer } from '@shared/types'
import Pagination from '@ui/shared/pagination/Pagination'
import useCustomers from '../data-access-customers/useCustomers'
import { CustomerContextProvider } from '../util-customer-context/CustomerContext'
import CustomersInfoTable from '../ui-customers-info-table/CustomersInfoTable'
import Loader from '@ui/shared/loader/Loader'

const cx = classNames.bind(styles)

type CustomersInfoProps = {
  searchBy: SearchByCustomer
  keyword: string
  page: number
}

const CustomersInfo = ({ keyword, page, searchBy }: CustomersInfoProps) => {
  const { data: customersData, isLoading } = useCustomers({ keyword, page, searchBy })
  if (isLoading || !customersData) return (
    <div className={cx('loading')}>
      <Loader />
    </div>
  )
  const { currentPage, data, totalPages } = customersData

  return (
    <div>
      <CustomerContextProvider page={page} searchBy={searchBy} keyword={keyword}>
        <CustomersInfoTable data={data} />
      </CustomerContextProvider>
      {data.length > 0 && (
        <div className={cx('paginationWrapper')}>
          <Pagination currentPage={currentPage} totalPages={totalPages} />
        </div>
      )}
    </div>
  )
}

export default CustomersInfo
