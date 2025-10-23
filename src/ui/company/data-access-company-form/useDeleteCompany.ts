import { AxiosError } from 'axios'
import { useRouter } from 'next/router'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import useConfirmModal from '@ui/shared/modal/confirm-modal/useConfirmModal'
import { AxiosErrorData, CompanyType, OffsetPagination } from '@shared/types'
import useUpdateQueryURL from '@ui/shared/util-hook/useUpdateQueryURL'
import { deleteCompany } from '@shared/api'
import { useCompanyContext } from '../util-company-context/CompanyContext'

const useDeleteCompany = () => {
  const queryClient = useQueryClient()
  const { openConfirmModal } = useConfirmModal()
  const { keyword, page, searchBy } = useCompanyContext()

  const router = useRouter()
  const { updateQueryURL } = useUpdateQueryURL()

  const mutation = useMutation<
    { message: string },
    AxiosError<AxiosErrorData>,
    number,
    unknown
  >({
    mutationFn: async (id) => await deleteCompany(id),
    onSuccess: async () => {
      openConfirmModal({
        text: '기업 정보 삭제에 성공했습니다.',
      })
      const queryData: OffsetPagination<CompanyType> | undefined =
        queryClient.getQueryData(['companies', { keyword, page, searchBy }])
      if (!queryData) return
      const { data } = queryData
      if (data.length <= 1 && page > 1)
        await router.push(updateQueryURL({ page: page - 1 }), undefined, {
          scroll: false,
        })
      queryClient.invalidateQueries({ queryKey: ['companies'] })
    },
    onError: (error) => {
      const text =
        error?.response?.data?.message || '기업 정보 삭제에 실패했습니다.'
      openConfirmModal({
        text,
      })
    },
  })

  return mutation
}

export default useDeleteCompany
