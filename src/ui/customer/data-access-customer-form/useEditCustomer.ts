import { AxiosError } from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { editCustomer } from '@shared/api'
import {
  AxiosErrorData,
  CustomerFormInput,
  CustomerType,
  OffsetPagination,
} from '@shared/types'
import useConfirmModal from '@ui/shared/modal/confirm-modal/useConfirmModal'
import { useCustomerContext } from '../util-customer-context/CustomerContext'

const useEditCustomer = () => {
  const queryClient = useQueryClient()
  const { openConfirmModal } = useConfirmModal()
  const { keyword, page, searchBy } = useCustomerContext()

  const mutation = useMutation<
    CustomerType,
    AxiosError<AxiosErrorData>,
    {
      id: number
      data: CustomerFormInput
    },
    unknown
  >({
    mutationFn: async ({ id, data }) => await editCustomer(id, data),
    onSuccess: (newCustomer) => {
      openConfirmModal({
        text: '고객 정보 수정에 성공했습니다.',
      })
      const queryData: OffsetPagination<CustomerType> | undefined =
        queryClient.getQueryData(['customers', { keyword, page, searchBy }])
      if (!queryData) return
      queryClient.setQueryData(['customers', { keyword, page, searchBy }], {
        ...queryData,
        data: queryData.data.map((customer) => {
          if (customer.id === newCustomer.id) {
            return newCustomer
          }
          return customer
        }),
      })
      queryClient.invalidateQueries({ queryKey: ['customersForContract'] })
    },
    onError: (error) => {
      const text =
        error?.response?.data?.message || '고객 정보 수정에 실패했습니다.'
      openConfirmModal({
        text,
      })
    },
  })

  return mutation
}

export default useEditCustomer
