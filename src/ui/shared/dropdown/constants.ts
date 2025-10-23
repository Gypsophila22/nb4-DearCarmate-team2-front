import { CarStatus, SearchByCar, SearchByCompany, SearchByContract, SearchByContractDocument, SearchByCustomer, SearchByUser } from '@shared/types'

export const SEARCH_BY_CAR_FILTERS = [
  {
    data: SearchByCar.carNumber,
    text: '차량 번호',
  },
  {
    data: SearchByCar.model,
    text: '차종',
  },
]

export const SEARCH_BY_CUSTOMER_FILTERS = [
  {
    data: SearchByCustomer.name,
    text: '고객명',
  },
  {
    data: SearchByCustomer.email,
    text: '이메일',
  },
]

export const SEARCH_BY_CONTRACT_FILTERS = [
  {
    data: SearchByContract.customerName,
    text: '고객명',
  },
  {
    data: SearchByContract.userName,
    text: '담당자명',
  },
]

export const SEARCH_BY_COMPANY_FILTERS = [
  {
    data: SearchByCompany.companyName,
    text: '기업명',
  },
  {
    data: SearchByCompany.companyCode,
    text: '기업 코드',
  },
]

export const SEARCH_BY_USER_FILTERS = [
  {
    data: SearchByUser.companyName,
    text: '기업명',
  },
  {
    data: SearchByUser.name,
    text: '이름',
  },
  {
    data: SearchByUser.email,
    text: '이메일',
  },
]

export const SEARCH_BY_CONTRACT_DOCUMENTS_FILTERS = [
  {
    data: SearchByContractDocument.contractName,
    text: '계약명',
  },
  {
    data: SearchByContractDocument.userName,
    text: '담당자명',
  },
  {
    data: SearchByContractDocument.carNumber,
    text: '차량번호',
  },
]

const currentYear = new Date().getFullYear()
export const CAR_MANUFACTURING_YEAR_FILTERS = Array.from({ length: 51 }, (_, i) => {
  const year = currentYear - i
  return {
    data: year,
    text: year.toString(),
  }
})

export const CAR_STATUS_FILTERS = [
  {
    data: CarStatus.possession,
    text: '보유 중',
  },
  {
    data: CarStatus.contractProceeding,
    text: '계약 진행 중',
  },
  {
    data: CarStatus.contractCompleted,
    text: '계약 완료',
  },
]
