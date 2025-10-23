import { AxiosError } from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { registerCompany } from '@shared/api'
import useConfirmModal from '@ui/shared/modal/confirm-modal/useConfirmModal'
import { AxiosErrorData, CompanyFormInput, CompanyType } from '@shared/types'

const useRegisterCompany = () => {
  const { openConfirmModal } = useConfirmModal()
  const queryClient = useQueryClient()

  const mutation = useMutation<
    CompanyType,
    AxiosError<AxiosErrorData>,
    CompanyFormInput,
    unknown
  >({
    mutationFn: registerCompany,
    onSuccess: () => {
      openConfirmModal({
        text: '기업 등록에 성공했습니다.',
      })
      queryClient.invalidateQueries({
        queryKey: ['companies'],
      })
    },
    onError: (error) => {
      const text = error?.response?.data?.message || '기업 등록에 실패했습니다.'
      openConfirmModal({
        text,
      })
    },
  })

  return mutation
}

export default useRegisterCompany
