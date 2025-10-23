import { useRouter } from 'next/router'
import { AxiosError } from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import useConfirmModal from '@ui/shared/modal/confirm-modal/useConfirmModal'
import { deleteCustomer } from '@shared/api'
import { AxiosErrorData, CustomerType, OffsetPagination } from '@shared/types'
import useUpdateQueryURL from '@ui/shared/util-hook/useUpdateQueryURL'
import { useCustomerContext } from '../util-customer-context/CustomerContext'

const useDeleteCustomer = () => {
  const queryClient = useQueryClient()
  const { openConfirmModal } = useConfirmModal()
  const { keyword, page, searchBy } = useCustomerContext()

  const router = useRouter()
  const { updateQueryURL } = useUpdateQueryURL()

  const mutation = useMutation<
    { message: string },
    AxiosError<AxiosErrorData>,
    number,
    unknown
  >({
    mutationFn: async (id) => await deleteCustomer(id),
    onSuccess: async () => {
      openConfirmModal({
        text: '고객 정보 삭제에 성공했습니다.',
      })
      const queryData: OffsetPagination<CustomerType> | undefined =
        queryClient.getQueryData(['customers', { keyword, page, searchBy }])
      if (!queryData) return
      const { data } = queryData
      if (data.length <= 1 && page > 1)
        await router.push(updateQueryURL({ page: page - 1 }), undefined, {
          scroll: false,
        })
      queryClient.invalidateQueries({ queryKey: ['customers'] })
      queryClient.invalidateQueries({ queryKey: ['customersForContract'] })
    },
    onError: (error) => {
      const text =
        error?.response?.data?.message || '고객 정보 삭제에 실패했습니다.'
      openConfirmModal({
        text,
      })
    },
  })

  return mutation
}

export default useDeleteCustomer
