import { CompanyUserType } from '@shared/types'
import { Column } from '@ui/shared/table/types'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@ui/shared/table/composition'
import EmptyData from '@ui/shared/table/EmptyData'
import UserOptionButton from '../feature-users/UserOptionButton'

type UserTableItem = Omit<CompanyUserType, 'company'> & { companyName: string }

type UserListTableProps = {
  data: UserTableItem[]
}

const columns: Column<UserTableItem>[] = [
  { key: 'companyName', title: '기업명' },
  { key: 'name', title: '이름' },
  { key: 'email', title: '이메일' },
  { key: 'employeeNumber', title: '사원 번호' },
  { key: 'phoneNumber', title: '연락처' },
]

const UserListTable = ({ data }: UserListTableProps) => {
  const isEmpty = data.length === 0

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.key} style={{ textAlign: 'center' }}>{column.title}</TableCell>
            ))}
            <TableCell style={{ textAlign: 'center' }} />
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((record) => {
            return (
              <TableRow
                key={record.id}
              >
                {columns.map((column) => (
                  <TableCell key={column.key} style={{ textAlign: 'center' }}>{record[column.key]}</TableCell>
                ))}
                <TableCell isLast style={{ textAlign: 'center' }}>
                  <UserOptionButton userId={record.id} name={record.name} />
                </TableCell>
              </TableRow>
            )
          })}
          {isEmpty && (
            <TableRow>
              <TableCell colSpan={columns.length + 1}>
                <EmptyData />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default UserListTable
