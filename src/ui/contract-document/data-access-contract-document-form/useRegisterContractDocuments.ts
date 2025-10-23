import { AxiosError } from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import useConfirmModal from '@ui/shared/modal/confirm-modal/useConfirmModal'
import { editContract } from '@shared/api'
import {
  AxiosErrorData,
  ContractDocumentRegisterFormInput,
  ContractType,
} from '@shared/types'

const useRegisterContractDocuments = () => {
  const queryClient = useQueryClient()
  const { openConfirmModal } = useConfirmModal()

  const mutation = useMutation<
    ContractType,
    AxiosError<AxiosErrorData>,
    ContractDocumentRegisterFormInput,
    unknown
  >({
    mutationFn: async ({ id, ...data }) =>
      await editContract(id, data),
    onSuccess: () => {
      openConfirmModal({
        text: '계약서 추가에 성공했습니다.',
      })
      queryClient.invalidateQueries({ queryKey: ['contractDocuments'] })
    },
    onError: (error) => {
      const text =
        error?.response?.data?.message || '계약서 추가에 실패했습니다.'
      openConfirmModal({
        text,
      })
    },
  })

  return mutation
}

export default useRegisterContractDocuments
