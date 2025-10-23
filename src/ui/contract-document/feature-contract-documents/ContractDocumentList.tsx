import classNames from 'classnames/bind'
import styles from './ContractDocumentList.module.scss'
import { SearchByContractDocument } from '@shared/types'
import Pagination from '@ui/shared/pagination/Pagination'
import ContractDocumentListTable from '../ui-contract-document-list-table/ContractDocumentListTable'
import Loader from '@ui/shared/loader/Loader'
import useContractDocuments from '../data-access-contract-documents/useContractDocuments'

const cx = classNames.bind(styles)

type ContractDocumentListProps = {
  searchBy: SearchByContractDocument
  keyword: string
  page: number
}

const ContractDocumentList = ({ keyword, page, searchBy }: ContractDocumentListProps) => {
  const { data: contractDocumentsData, isLoading } = useContractDocuments({ keyword, page, searchBy })
  if (isLoading || !contractDocumentsData) return (
    <div className={cx('loading')}>
      <Loader />
    </div>
  )

  const { currentPage, data, totalPages } = contractDocumentsData

  return (
    <div>
      <ContractDocumentListTable data={data} />
      {data.length > 0 && (
        <div className={cx('paginationWrapper')}>
          <Pagination currentPage={currentPage} totalPages={totalPages} />
        </div>
      )}
    </div>
  )
}

export default ContractDocumentList
