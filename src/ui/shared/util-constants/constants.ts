import { CarStatus, ContractStatus, Gender } from '@shared/types'

export const URL_VALIDATION_REGEXP = /^(https?:\/\/)/
export const PASSWORD_VALIDATION_REGEXP = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/
export const EMAIL_VALIDATION_REGEXP = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
export const PHONE_NUMBER_VALIDATION_REGEXP = /^\d{2,3}-\d{3,4}-\d{4}$/

export const CAR_STATUS_MAP: { [key in CarStatus]: string } = {
  [CarStatus.possession]: '보유 중',
  [CarStatus.contractProceeding]: '계약 진행 중',
  [CarStatus.contractCompleted]: '계약 완료',
}

export const CUSTOMER_GENDER_MAP: { [key in Gender]: string } = {
  [Gender.male]: '남',
  [Gender.female]: '여',
}

export const CONTRACT_STATUS_MAP: { [key in ContractStatus]: string } = {
  [ContractStatus.carInspection]: '차량 확인',
  [ContractStatus.priceNegotiation]: '가격 협의',
  [ContractStatus.contractDraft]: '계약서 작성 중',
  [ContractStatus.contractSuccessful]: '계약 성공',
  [ContractStatus.contractFailed]: '계약 실패',
}
