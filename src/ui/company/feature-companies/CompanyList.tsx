import classNames from 'classnames/bind'
import styles from './CompanyList.module.scss'
import { SearchByCompany } from '@shared/types'
import Pagination from '@ui/shared/pagination/Pagination'
import { CompanyContextProvider } from '../util-company-context/CompanyContext'
import useCompanies from '../data-access-companies/useCompanies'
import CompanyListTable from '../ui-company-list-table/CompanyListTable'
import Loader from '@ui/shared/loader/Loader'

const cx = classNames.bind(styles)

type CompanyListProps = {
  searchBy: SearchByCompany
  keyword: string
  page: number
}

const CompanyList = ({ keyword, page, searchBy }: CompanyListProps) => {
  const { data: companiesData, isLoading } = useCompanies({ keyword, page, searchBy })
  if (isLoading || !companiesData) return (
    <div className={cx('loading')}>
      <Loader />
    </div>
  )

  const { currentPage, data, totalPages } = companiesData

  return (
    <div>
      <CompanyContextProvider page={page} searchBy={searchBy} keyword={keyword}>
        <CompanyListTable data={data} />
      </CompanyContextProvider>
      {data.length > 0 && (
        <div className={cx('paginationWrapper')}>
          <Pagination currentPage={currentPage} totalPages={totalPages} />
        </div>
      )}
    </div>
  )
}

export default CompanyList
