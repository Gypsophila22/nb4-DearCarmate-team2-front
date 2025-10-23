import { ContractDocumentType } from '@shared/types'
import { Column } from '@ui/shared/table/types'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@ui/shared/table/composition'
import EmptyData from '@ui/shared/table/EmptyData'
import { format, parseISO } from 'date-fns'
import { ko } from 'date-fns/locale'
import ContractDocumentOptionButtons from '../feature-contract-documents/ContractDocumentOptionButtons'

type ContractDocumentListTableProps = {
  data: ContractDocumentType[]
}

const columns: Column<Omit<ContractDocumentType, 'documents'>>[] = [
  { key: 'contractName', title: '계약명' },
  { key: 'resolutionDate', title: '계약체결일' },
  { key: 'documentCount', title: '문서 수(개)' },
  { key: 'userName', title: '담당자' },
  { key: 'carNumber', title: '차량번호' },
]

const ContractDocumentListTable = ({ data }: ContractDocumentListTableProps) => {
  const isEmpty = data.length === 0

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.key}>{column.title}</TableCell>
            ))}
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((record) => {
            const processedRecord = {
              ...record,
              resolutionDate: record.resolutionDate ? format(parseISO(record.resolutionDate), 'yyyy년 MM월 dd일', { locale: ko }) : '-',
            }
            return (
              <TableRow
                key={record.id}
              >
                {columns.map((column) => (
                  <TableCell key={column.key}>{processedRecord[column.key]}</TableCell>
                ))}
                <TableCell isLast>
                  <ContractDocumentOptionButtons contractDocument={record} />
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

export default ContractDocumentListTable
