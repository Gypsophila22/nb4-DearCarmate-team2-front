import { AxiosError } from 'axios'
import { editUser } from '@shared/api'
import useConfirmModal from '@ui/shared/modal/confirm-modal/useConfirmModal'
import { AxiosErrorData, ProfileFormInput, UserInfo } from '@shared/types'
import { useMutation } from '@tanstack/react-query'
import useUserStore from '@zustand/useUserStore'

const useEditUser = () => {
  const { openConfirmModal } = useConfirmModal()
  const setUser = useUserStore.use.setUser()

  const mutation = useMutation<
    UserInfo,
    AxiosError<AxiosErrorData>,
    ProfileFormInput,
    unknown
  >({
    mutationFn: async (data) => await editUser(data),
    onSuccess: (data) => {
      openConfirmModal({
        text: ' 개인정보 수정에 성공했습니다.',
      })
      setUser(data)
    },
    onError: (error) => {
      const text =
        error?.response?.data?.message || '개인정보 수정에 실패했습니다.'
      openConfirmModal({
        text,
      })
    },
  })

  return mutation
}

export default useEditUser
