import { AxiosError } from 'axios'
import { registerCustomer } from '@shared/api'
import {
  AxiosErrorData,
  CustomerFormInput,
  CustomerType,
} from '@shared/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import useConfirmModal from '@ui/shared/modal/confirm-modal/useConfirmModal'

const useRegisterCustomer = () => {
  const { openConfirmModal } = useConfirmModal()
  const queryClient = useQueryClient()

  const mutation = useMutation<
    CustomerType,
    AxiosError<AxiosErrorData>,
    CustomerFormInput,
    unknown
  >({
    mutationFn: async (data) => await registerCustomer(data),
    onSuccess: () => {
      openConfirmModal({
        text: '고객 정보 등록에 성공했습니다.',
      })
      queryClient.invalidateQueries({ queryKey: ['customers'] })
      queryClient.invalidateQueries({ queryKey: ['customersForContract'] })
    },
    onError: (error) => {
      const text =
        error?.response?.data?.message || '고객 정보 등록에 실패했습니다.'
      openConfirmModal({
        text,
      })
    },
  })

  return mutation
}

export default useRegisterCustomer
