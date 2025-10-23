import classNames from 'classnames/bind'
import styles from './UserList.module.scss'
import { SearchByUser } from '@shared/types'
import Pagination from '@ui/shared/pagination/Pagination'
import { UserContextProvider } from '../util-user-context/UserContext'
import useUsers from '../data-access-users/useUsers'
import UserListTable from '../ui-user-list-table/UserListTable'
import Loader from '@ui/shared/loader/Loader'

const cx = classNames.bind(styles)

type UserListProps = {
  searchBy: SearchByUser
  keyword: string
  page: number
}

const UserList = ({ keyword, page, searchBy }: UserListProps) => {
  const { data: usersData, isLoading } = useUsers({ keyword, page, searchBy })
  if (isLoading || !usersData) return (
    <div className={cx('loading')}>
      <Loader />
    </div>
  )

  const { currentPage, data, totalPages } = usersData
  const tableData = data.map((user) => ({
    id: user.id,
    companyName: user.company.companyName,
    name: user.name,
    email: user.email,
    employeeNumber: user.employeeNumber,
    phoneNumber: user.phoneNumber,
  }))

  return (
    <div>
      <UserContextProvider page={page} searchBy={searchBy} keyword={keyword}>
        <UserListTable data={tableData} />
      </UserContextProvider>
      {data.length > 0 && (
        <div className={cx('paginationWrapper')}>
          <Pagination currentPage={currentPage} totalPages={totalPages} />
        </div>
      )}
    </div>
  )
}

export default UserList
