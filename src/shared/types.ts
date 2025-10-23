
// 공통
export type OffsetPagination<T> = {
  currentPage: number,
  totalPages: number,
  totalItemCount: number
  data: T[],
}

export type Meeting = {
  date: string,
  alarms: string[],
}

export type AxiosErrorData = { message: string }

// Enum
export enum ContractStatus {
  carInspection = 'carInspection',
  priceNegotiation = 'priceNegotiation',
  contractDraft = 'contractDraft',
  contractSuccessful = 'contractSuccessful',
  contractFailed = 'contractFailed',
}

export enum CarStatus {
  possession = 'possession',
  contractProceeding = 'contractProceeding',
  contractCompleted = 'contractCompleted',
}

export enum CarStatusParam {
  total = 'total',
  possession = CarStatus.possession,
  contractProceeding = CarStatus.contractProceeding,
  contractCompleted = CarStatus.contractCompleted,
}

export enum SearchByCar {
  carNumber = 'carNumber',
  model = 'model',
}

export enum SearchByCustomer {
  name = 'name',
  email = 'email',
}

export enum SearchByContract {
  customerName = 'customerName',
  userName = 'userName',
}

export enum SearchByCompany {
  companyName = 'companyName',
  companyCode = 'companyCode',
}

export enum SearchByUser {
  companyName = 'companyName',
  name = 'name',
  email = 'email',
}

export enum SearchByContractDocument {
  contractName = 'contractName',
  userName = 'userName',
  carNumber = 'carNumber',
}

export enum Gender {
  'male' = 'male',
  'female' = 'female'
}

export enum AgeGroup {
  '10대' = '10대',
  '20대' = '20대',
  '30대' = '30대',
  '40대' = '40대',
  '50대' = '50대',
  '60대' = '60대',
  '70대' = '70대',
  '80대' = '80대',
}

export enum Region {
  '서울' = '서울',
  '경기' = '경기',
  '인천' = '인천',
  '강원' = '강원',
  '충북' = '충북',
  '충남' = '충남',
  '세종' = '세종',
  '대전' = '대전',
  '전북' = '전북',
  '전남' = '전남',
  '광주' = '광주',
  '경북' = '경북',
  '경남' = '경남',
  '대구' = '대구',
  '울산' = '울산',
  '부산' = '부산',
  '제주' = '제주',
}

export enum AlarmDay {
  today = 0,
  yesterday = 1,
}

// car - data
export type CarType = {
  id: number,
  carNumber: string,
  manufacturer: string,
  model: string,
  manufacturingYear: number,
  mileage: number,
  price: number,
  accidentCount: number,
  explanation: string,
  accidentDetails: string,
  status: CarStatus,
  type: string,
}

export type CarModel = {
  manufacturer: string
  model: string[]
}

// car - form
export type CarFormInput = {
  accidentDetails: string,
  explanation: string,
  accidentCount: number,
  price: number,
  mileage: number,
  manufacturingYear: number,
  model: string,
  manufacturer: string,
  carNumber: string,
}

// customer - data
export type CustomerType = {
  id: number
  name: string
  gender: Gender,
  phoneNumber: string
  ageGroup: AgeGroup | null
  region: Region | null
  email: string
  memo: string
  contractCount: number
}

// customer - form
export type CustomerFormInput = {
  name: string,
  gender: Gender,
  phoneNumber: string,
  ageGroup: AgeGroup | null,
  region: Region | null,
  email: string,
  memo: string,
}

// contract - data
export type ContractType = {
  id: number,
  car: {
    id: number,
    model: string,
  },
  customer: {
    id: number,
    name: string,
  },
  user: {
    id: number,
    name: string,
  },
  meetings: Meeting[],
  status: ContractStatus,
  contractPrice: number,
  resolutionDate: string | null,
  contractDocuments: DocumentType[],
}

export type ContractsBoardGroupType = {
  totalItemCount: number,
  data: ContractType[],
}

export type ContractsListType = {
  [key in ContractStatus]: ContractsBoardGroupType
}

export type ItemForDropdown = {
  id: number,
  data: string,
}

// contract - form
export type ContractFormInput = {
  // 참고: request body에는 id를 제거하고 전송
  meetings: (Meeting & { id: string })[],
  carId: number,
  customerId: number,
  userId?: number,
}

// contract document - data
export type DocumentType = {
  id: number,
  fileName: string,
}

export type ContractDocumentType = {
  documents: DocumentType[],
  carNumber: string,
  userName: string,
  documentCount: number,
  resolutionDate: string,
  contractName: string,
  id: number,
}

// contract document - form
export type ContractDocumentRegisterFormInput = {
  id: number,
  contractDocuments: DocumentType[],
}

export type ContractDocumentEditFormInput = {
  contractDocuments: DocumentType[],
}

// dashboard - data
export type DashboardCardType = {
  monthlySales: number,
  lastMonthSales: number,
  growthRate: number,
  proceedingContractsCount: number,
  completedContractsCount: number,
}

export type DashboardChartType = {
  contractsByCarType: {
    carType: string,
    count: number,
  }[],
  salesByCarType: {
    carType: string,
    count: number,
  }[],
}

export type DashboardData = DashboardCardType & DashboardChartType

// user - data
export type UserInfo = {
  id: number,
  name: string,
  email: string,
  employeeNumber: string,
  phoneNumber: string,
  imageUrl: string | null,
  company: {
    companyName: string,
  }
  isAdmin: boolean,
}

export type CompanyUserType = Omit<UserInfo, 'imageUrl' | 'isAdmin'>

// user - form
export type SignUpFormInput = {
  passwordConfirmation: string
  password: string
  phoneNumber: string,
  employeeNumber: string,
  email: string,
  name: string,
  companyCode: string,
  companyName: string
}

export type SignInFormInput = {
  email: string
  password: string
}

export type PasswordCheckFormInput = {
  password: string
}

export type ProfileFormInput = {
  imageUrl: string | null,
  phoneNumber: string,
  employeeNumber: string,
  currentPassword: string,
  password?: string,
  passwordConfirmation?: string,
}

// company - data
export type CompanyType = {
  id: number,
  companyCode: string,
  companyName: string,
  userCount: number,
}

// company - form
export type CompanyFormInput = {
  companyCode: string,
  companyName: string,
}

// setting - input
export type BaseUrlSettingFormInput = {
  baseUrl: string
}
