import useUserStore from '@zustand/useUserStore'
import { AxiosErrorData, SignInFormInput } from '@shared/types'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import useConfirmModal from '@ui/shared/modal/confirm-modal/useConfirmModal'
import { AxiosError } from 'axios'
import { signIn, SignInResponse } from '@shared/api'
import { setTokenCookies } from '@shared/auth'

const useSignIn = () => {
  const router = useRouter()
  const setUser = useUserStore.use.setUser()
  const { openConfirmModal } = useConfirmModal()

  const mutation = useMutation<
    SignInResponse,
    AxiosError<AxiosErrorData>,
    SignInFormInput
  >({
    mutationFn: signIn,
    onSuccess: (data) => {
      const { accessToken, refreshToken, user } = data
      setTokenCookies(accessToken, refreshToken)
      setUser(user)
      user.isAdmin ? router.push('/admin/companies') : router.push('/')
    },
    onError: (error) => {
      const text = error?.response?.data?.message || '로그인에 실패했습니다.'
      openConfirmModal({
        text,
      })
    },
  })

  return mutation
}

export default useSignIn
