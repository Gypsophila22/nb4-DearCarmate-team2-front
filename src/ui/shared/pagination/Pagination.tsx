import classNames from 'classnames/bind'
import styles from './Pagination.module.scss'
import useUpdateQueryURL from '../util-hook/useUpdateQueryURL'
import Icon from '../icon/Icon'
import Link from 'next/link'
import getPageArray from './getPageArray'

const cx = classNames.bind(styles)

type PaginationProps = {
  currentPage: number
  totalPages: number
  scroll?: boolean
}

const Pagination = ({ currentPage, totalPages, scroll = true }: PaginationProps) => {
  const pageArray = getPageArray(currentPage, totalPages)
  const { updateQueryURL } = useUpdateQueryURL()

  return (
    <div className={cx('container')}>
      <Link
        href={updateQueryURL({ 'page': currentPage - 1 })}
        className={cx('button', { disabled: currentPage === 1 })}
        scroll={scroll}
      >
        <Icon name={currentPage === 1 ? 'arrow-left-disabled' : 'arrow-left-active'} width={28} height={28} />
      </Link>
      {pageArray.map((pageNum) => {
        return (
          <Link
            href={updateQueryURL({ 'page': pageNum })}
            key={pageNum}
            className={cx('button', { selected: currentPage === pageNum })}
            scroll={scroll}
          >
            <span>{pageNum}</span>
          </Link>
        )
      })}
      <Link
        href={updateQueryURL({ 'page': currentPage + 1 })}
        className={cx('button', { disabled: currentPage === totalPages })}
        scroll={scroll}
      >
        <Icon name={currentPage === totalPages ? 'arrow-left-disabled' : 'arrow-left-active'} width={28} height={28} alt='오른쪽 화살표' rotate={180} />
      </Link>
    </div>
  )
}

export default Pagination
