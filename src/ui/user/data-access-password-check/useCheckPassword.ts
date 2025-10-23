import useConfirmModal from '@ui/shared/modal/confirm-modal/useConfirmModal'
import { checkPassword, CheckPasswordResponse } from '@shared/api'
import { AxiosErrorData, PasswordCheckFormInput } from '@shared/types'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'

const useCheckPassword = () => {
  const { openConfirmModal } = useConfirmModal()

  const mutation = useMutation<
    CheckPasswordResponse,
    AxiosError<AxiosErrorData>,
    PasswordCheckFormInput,
    unknown
  >({
    mutationFn: async (data) => await checkPassword(data),
    onSuccess: () => {},
    onError: (error) => {
      const text =
        error?.response?.data?.message || '회원 정보 확인에 실패했습니다.'
      openConfirmModal({
        text,
      })
    },
  })

  return mutation
}

export default useCheckPassword
