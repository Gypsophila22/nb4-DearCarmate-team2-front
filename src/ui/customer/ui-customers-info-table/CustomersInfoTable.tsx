import { CustomerType } from '@shared/types'
import { Column } from '@ui/shared/table/types'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@ui/shared/table/composition'
import EmptyData from '@ui/shared/table/EmptyData'
import { CUSTOMER_GENDER_MAP } from '@ui/shared/util-constants/constants'
import CustomerOptionButtons from '../feature-customers/CustomerOptionButtons'
import useCustomerDetailModal from '../util-customer-detail-modal/useCustomerDetailModal'

type CustomersInfoTableProps = {
  data: CustomerType[]
}

const columns: Column<CustomerType>[] = [
  { key: 'name', title: '고객명' },
  { key: 'contractCount', title: '계약 횟수' },
  { key: 'gender', title: '성별' },
  { key: 'phoneNumber', title: '연락처' },
  { key: 'ageGroup', title: '연령대' },
  { key: 'region', title: '지역' },
  { key: 'email', title: '이메일' },
]

const CustomersInfoTable = ({ data }: CustomersInfoTableProps) => {
  const { openCustomerDetailModal } = useCustomerDetailModal()
  const isEmpty = data.length === 0

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.key} width={column.key === 'email' ? '230px' : undefined}>{column.title}</TableCell>
            ))}
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((record) => {
            const processedRecord = {
              ...record,
              gender: CUSTOMER_GENDER_MAP[record.gender],
              ageGroup: record.ageGroup || '-',
              region: record.region || '-',
            }
            return (
              <TableRow
                key={record.id}
                onClick={() => {
                  openCustomerDetailModal({ data: record })
                }}
              >
                {columns.map((column) => (
                  <TableCell key={column.key}>{processedRecord[column.key]}</TableCell>
                ))}
                <TableCell isLast>
                  <CustomerOptionButtons customer={record} />
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

export default CustomersInfoTable
