import { AxiosError } from 'axios'
import { useMutation } from '@tanstack/react-query'
import { AxiosErrorData, SignUpFormInput, UserInfo } from '@shared/types'
import { signUp } from '@shared/api'
import useConfirmModal from '@ui/shared/modal/confirm-modal/useConfirmModal'
import useSignIn from './useSignIn'

const useSignUp = () => {
  const { mutate } = useSignIn()
  const { openConfirmModal } = useConfirmModal()

  const mutation = useMutation<
    UserInfo,
    AxiosError<AxiosErrorData>,
    SignUpFormInput
  >({
    mutationFn: signUp,
    onSuccess: async (data, { email, password }) => {
      await mutate({ email, password })
    },
    onError: (error) => {
      const text = error?.response?.data?.message || '회원가입에 실패했습니다.'
      openConfirmModal({
        text,
      })
    },
  })

  return mutation
}

export default useSignUp
