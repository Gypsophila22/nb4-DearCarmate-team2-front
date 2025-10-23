import { instance as axios } from './axios'
import {
  CarFormInput,
  CarModel,
  CarStatusParam,
  CarType,
  CompanyFormInput,
  CompanyType,
  CompanyUserType,
  ContractDocumentType,
  ContractFormInput,
  ContractsListType,
  ContractStatus,
  ContractType,
  CustomerFormInput,
  CustomerType,
  DashboardData,
  DocumentType,
  ItemForDropdown,
  Meeting,
  OffsetPagination,
  PasswordCheckFormInput,
  ProfileFormInput,
  SearchByCar,
  SearchByCompany,
  SearchByContract,
  SearchByContractDocument,
  SearchByCustomer,
  SearchByUser,
  SignInFormInput,
  SignUpFormInput,
  UserInfo,
} from './types'

// Auth related APIs
export interface SignInResponse {
  accessToken: string
  refreshToken: string
  user: UserInfo
}

export const signIn = async (data: SignInFormInput) => {
  const response = await axios.post<SignInResponse>('/auth/login', data)
  return response.data
}

export const signUp = async (data: SignUpFormInput) => {
  const response = await axios.post<UserInfo>('/users', data)
  return response.data
}

// User related APIs
export const getUserInfo = async () => {
  const response = await axios.get<UserInfo>('/users/me')
  return response.data
}

export interface CheckPasswordResponse {
  encryptedCurrentPassword: string
}

export const checkPassword = async (
  data: PasswordCheckFormInput,
): Promise<CheckPasswordResponse> => {
  const response = await axios.post<CheckPasswordResponse>('/users/check', data)
  return response.data
}

export const editUser = async (data: ProfileFormInput) => {
  const response = await axios.patch<UserInfo>('/users/me', data)
  return response.data
}

export const deleteUser = async (id: number) => {
  const response = await axios.delete<{ message: string }>(`/users/${id}`)
  return response.data
}

// Car related APIs
export const getCar = async (id: number) => {
  const response = await axios.get<CarType>(`/cars/${id}`)
  return response.data
}

export const deleteCar = async (id: number) => {
  const response = await axios.delete<{ message: string }>(`/cars/${id}`)
  return response.data
}

export const editCar = async (id: number, data: CarFormInput) => {
  const response = await axios.patch<CarType>(`/cars/${id}`, data)
  return response.data
}

export const registerCar = async (data: CarFormInput) => {
  const response = await axios.post<CarType>('/cars', data)
  return response.data
}

export const getCarModels = async () => {
  const response = await axios.get<{ data: CarModel[] }>('/cars/models')
  return response.data
}

export const getCars = async ({
  page = 1,
  pageSize = 10,
  searchBy,
  keyword,
  status,
}: {
  page: number
  pageSize: number
  searchBy: SearchByCar
  keyword: string
  status: CarStatusParam
}) => {
  const response = await axios.get<OffsetPagination<CarType>>('/cars', {
    params: {
      page,
      pageSize,
      searchBy,
      keyword,
      ...(status !== CarStatusParam.total && { status }),
    },
  })
  return response.data
}

export const bulkUploadCars = async (data: FormData) => {
  const response = await axios.post('/cars/upload', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response.data
}

// Company related APIs
export const deleteCompany = async (id: number) => {
  const response = await axios.delete<{ message: string }>(`/companies/${id}`)
  return response.data
}

export const editCompany = async (id: number, data: CompanyFormInput) => {
  const response = await axios.patch<CompanyType>(`/companies/${id}`, data)
  return response.data
}

export const registerCompany = async (data: CompanyFormInput) => {
  const response = await axios.post<CompanyType>('/companies', data)
  return response.data
}

export const getCompanies = async ({
  page,
  pageSize,
  searchBy,
  keyword,
}: {
  page: number
  pageSize: number
  searchBy: SearchByCompany
  keyword: string
}) => {
  const response = await axios.get<OffsetPagination<CompanyType>>(
    '/companies',
    {
      params: {
        page,
        pageSize,
        searchBy,
        keyword,
      },
    },
  )
  return response.data
}

export const getCompanyUsers = async ({
  page,
  pageSize,
  searchBy,
  keyword,
}: {
  page: number
  pageSize: number
  searchBy: SearchByUser
  keyword: string
}) => {
  const response = await axios.get<OffsetPagination<CompanyUserType>>(
    '/companies/users',
    {
      params: {
        page,
        pageSize,
        searchBy,
        keyword,
      },
    },
  )
  return response.data
}

// Customer related APIs
export const deleteCustomer = async (id: number) => {
  const response = await axios.delete<{ message: string }>(`/customers/${id}`)
  return response.data
}

export const editCustomer = async (id: number, data: CustomerFormInput) => {
  const response = await axios.patch<CustomerType>(`/customers/${id}`, data)
  return response.data
}

export const registerCustomer = async (data: CustomerFormInput) => {
  const response = await axios.post<CustomerType>('/customers', data)
  return response.data
}

export const getCustomers = async ({
  page,
  pageSize,
  searchBy,
  keyword,
}: {
  page: number
  pageSize: number
  searchBy: SearchByCustomer
  keyword: string
}) => {
  const response = await axios.get<OffsetPagination<CustomerType>>(
    '/customers',
    {
      params: {
        page,
        pageSize,
        searchBy,
        keyword,
      },
    },
  )
  return response.data
}

export const bulkUploadCustomers = async (data: FormData) => {
  const response = await axios.post('/customers/upload', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response.data
}

// Contract related APIs
export const deleteContract = async (id: number) => {
  const response = await axios.delete<{ message: string }>(`/contracts/${id}`)
  return response.data
}

export type ContractEditFormInput = Partial<{
  meetings: Meeting[]
  contractPrice: number
  resolutionDate: string
  status: ContractStatus
  carId: number
  customerId: number
  userId: number
  contractDocuments: DocumentType[]
}>

export const editContract = async (id: number, data: ContractEditFormInput) => {
  const response = await axios.patch<ContractType>(`/contracts/${id}`, data)
  return response.data
}

export type ContractStatusEditFormInput = {
  status: ContractStatus
  resolutionDate?: string | null
}

export const editContractStatus = async (
  id: number,
  data: ContractStatusEditFormInput,
) => {
  const response = await axios.patch<ContractType>(`/contracts/${id}`, data)
  return response.data
}

export type ContractRegisterFormInput = Omit<ContractFormInput, 'meetings'> & {
  meetings: Omit<ContractFormInput['meetings'][0], 'id'>[]
}

export const registerContract = async (data: ContractRegisterFormInput) => {
  const response = await axios.post<ContractType>('/contracts', data)
  return response.data
}

export const getContracts = async ({
  searchBy,
  keyword,
}: {
  searchBy: SearchByContract
  keyword: string
}) => {
  const response = await axios.get<ContractsListType>('/contracts', {
    params: {
      searchBy,
      keyword,
    },
  })
  return response.data
}

export const getCarsForContract = async () => {
  const response = await axios.get<ItemForDropdown[]>('/contracts/cars')
  return response.data
}

export const getCustomersForContract = async () => {
  const response = await axios.get<ItemForDropdown[]>('/contracts/customers')
  return response.data
}

export const getUsersForContract = async () => {
  const response = await axios.get<ItemForDropdown[]>('/contracts/users')
  return response.data
}

// Contract Document related APIs
export const getContractDocuments = async ({
  page,
  pageSize,
  searchBy,
  keyword,
}: {
  page: number
  pageSize: number
  searchBy: SearchByContractDocument
  keyword: string
}) => {
  const response = await axios.get<OffsetPagination<ContractDocumentType>>(
    '/contractDocuments',
    {
      params: {
        page,
        pageSize,
        searchBy,
        keyword,
      },
    },
  )
  return response.data
}

export const getDraftsForContractDocument = async () => {
  const response = await axios.get<ItemForDropdown[]>(
    '/contractDocuments/draft',
  )
  return response.data
}

export const downloadContractDocument = async (id: number) => {
  const response = await axios.get(`contractDocuments/${id}/download`, {
    responseType: 'blob',
  })
  return response.data
}

// Dashboard related APIs
export const getDashboardData = async () => {
  const response = await axios.get<DashboardData>('/dashboard')
  return response.data
}

// File upload related APIs
export const uploadFile = async (file: File): Promise<{ contractDocumentId: number }> => {
  const formData = new FormData()
  formData.append('file', file)
  const response = await axios.postForm<{ contractDocumentId: number }>(
    '/contractDocuments/upload',
    formData,
  )
  return response.data
}

export const uploadImage = async (
  file: File,
): Promise<{ imageUrl: string }> => {
  const formData = new FormData()
  formData.append('file', file)
  const response = await axios.postForm<{ imageUrl: string }>(
    '/images/upload',
    formData,
  )
  return response.data
}
