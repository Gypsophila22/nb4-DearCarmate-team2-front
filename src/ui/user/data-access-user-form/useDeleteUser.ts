import { AxiosError } from 'axios'
import { useRouter } from 'next/router'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import useConfirmModal from '@ui/shared/modal/confirm-modal/useConfirmModal'
import {
  AxiosErrorData,
  CompanyUserType,
  OffsetPagination,
} from '@shared/types'
import useUpdateQueryURL from '@ui/shared/util-hook/useUpdateQueryURL'
import { deleteUser } from '@shared/api'
import { useUserContext } from '../util-user-context/UserContext'

const useDeleteUser = () => {
  const queryClient = useQueryClient()
  const { openConfirmModal } = useConfirmModal()
  const { keyword, page, searchBy } = useUserContext()

  const router = useRouter()
  const { updateQueryURL } = useUpdateQueryURL()

  const mutation = useMutation<
    { message: string },
    AxiosError<AxiosErrorData>,
    number,
    unknown
  >({
    mutationFn: async (id) => await deleteUser(id),
    onSuccess: async () => {
      openConfirmModal({
        text: '유저 정보 삭제에 성공했습니다.',
      })
      const queryData: OffsetPagination<CompanyUserType> | undefined =
        queryClient.getQueryData(['users', { keyword, page, searchBy }])
      if (!queryData) return
      const { data } = queryData
      if (data.length <= 1 && page > 1)
        await router.push(updateQueryURL({ page: page - 1 }), undefined, {
          scroll: false,
        })
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
    onError: (error) => {
      const text =
        error?.response?.data?.message || '유저 정보 삭제에 실패했습니다.'
      openConfirmModal({
        text,
      })
    },
  })

  return mutation
}

export default useDeleteUser
