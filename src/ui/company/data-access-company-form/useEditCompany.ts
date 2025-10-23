import { AxiosError } from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import useConfirmModal from '@ui/shared/modal/confirm-modal/useConfirmModal'
import { editCompany } from '@shared/api'
import {
  AxiosErrorData,
  CompanyFormInput,
  CompanyType,
  OffsetPagination,
} from '@shared/types'
import { useCompanyContext } from '../util-company-context/CompanyContext'

const useEditCompany = () => {
  const queryClient = useQueryClient()
  const { openConfirmModal } = useConfirmModal()
  const { keyword, page, searchBy } = useCompanyContext()

  const mutation = useMutation<
    CompanyType,
    AxiosError<AxiosErrorData>,
    {
      id: number
      data: CompanyFormInput
    },
    unknown
  >({
    mutationFn: async ({ id, data }) => await editCompany(id, data),
    onSuccess: (newCompany) => {
      openConfirmModal({
        text: '기업 정보 수정에 성공했습니다.',
      })
      const queryData: OffsetPagination<CompanyType> | undefined =
        queryClient.getQueryData(['companies', { keyword, page, searchBy }])
      if (!queryData) return
      queryClient.setQueryData(['companies', { keyword, page, searchBy }], {
        ...queryData,
        data: queryData.data.map((company) => {
          if (company.id === newCompany.id) {
            return newCompany
          }
          return company
        }),
      })
    },
    onError: (error) => {
      const text =
        error?.response?.data?.message || '기업 정보 수정에 실패했습니다.'
      openConfirmModal({
        text,
      })
    },
  })

  return mutation
}

export default useEditCompany
