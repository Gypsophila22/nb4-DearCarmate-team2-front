import { CompanyType } from '@shared/types'
import { Column } from '@ui/shared/table/types'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@ui/shared/table/composition'
import EmptyData from '@ui/shared/table/EmptyData'
import CompanyOptionButtons from '../feature-companies/CompanyOptionButtons'

type CompanyListTableProps = {
  data: CompanyType[]
}

const columns: Column<CompanyType>[] = [
  { key: 'companyName', title: '기업명' },
  { key: 'companyCode', title: '기업 코드' },
  { key: 'userCount', title: '사원 수' },
]

const CompanyListTable = ({ data }: CompanyListTableProps) => {
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
            const processedRecord = {
              ...record,
              userCount: record.userCount.toLocaleString(),
            }
            return (
              <TableRow
                key={record.id}
              >
                {columns.map((column) => (
                  <TableCell key={column.key} style={{ textAlign: 'center' }}>{processedRecord[column.key]}</TableCell>
                ))}
                <TableCell isLast style={{ textAlign: 'center' }}>
                  <CompanyOptionButtons company={record} />
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

export default CompanyListTable
