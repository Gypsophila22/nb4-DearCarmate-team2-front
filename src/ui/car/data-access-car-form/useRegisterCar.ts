import { AxiosError } from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import useConfirmModal from '@ui/shared/modal/confirm-modal/useConfirmModal'
import { AxiosErrorData, CarFormInput, CarType } from '@shared/types'
import { registerCar } from '@shared/api'

const useRegisterCar = () => {
  const { openConfirmModal } = useConfirmModal()
  const queryClient = useQueryClient()

  const mutation = useMutation<
    CarType,
    AxiosError<AxiosErrorData>,
    CarFormInput,
    unknown
  >({
    mutationFn: async (data) => await registerCar(data),
    onSuccess: () => {
      openConfirmModal({
        text: '차량 정보 등록에 성공했습니다.',
      })
      queryClient.invalidateQueries({
        queryKey: ['cars'],
      })
    },
    onError: (error) => {
      const text =
        error?.response?.data?.message || '차량 정보 등록에 실패했습니다.'
      openConfirmModal({
        text,
      })
    },
  })

  return mutation
}

export default useRegisterCar
