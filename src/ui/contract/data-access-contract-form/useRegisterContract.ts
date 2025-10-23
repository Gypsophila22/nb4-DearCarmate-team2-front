import { AxiosError } from 'axios'
import { useRouter } from 'next/router'
import useConfirmModal from '@ui/shared/modal/confirm-modal/useConfirmModal'
import { AxiosErrorData, ContractType } from '@shared/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ContractRegisterFormInput, registerContract } from '@shared/api'

const useRegisterContract = () => {
  const { openConfirmModal } = useConfirmModal()
  const queryClient = useQueryClient()
  const router = useRouter()

  const mutation = useMutation<
    ContractType,
    AxiosError<AxiosErrorData>,
    ContractRegisterFormInput,
    unknown
  >({
    mutationFn: async (data) => await registerContract(data),
    onSuccess: () => {
      openConfirmModal({
        text: '계약 건 등록에 성공했습니다.',
      })
      queryClient.invalidateQueries({ queryKey: ['contracts'] })
      queryClient.invalidateQueries({ queryKey: ['customers'] })
      router.push('/')
    },
    onError: (error) => {
      const text =
        error?.response?.data?.message || '계약 건 등록에 실패했습니다.'
      openConfirmModal({
        text,
      })
    },
  })

  return mutation
}

export default useRegisterContract
