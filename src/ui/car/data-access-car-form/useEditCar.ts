import { AxiosError } from 'axios'
import useConfirmModal from '@ui/shared/modal/confirm-modal/useConfirmModal'
import {
  AxiosErrorData,
  CarFormInput,
  CarType,
  OffsetPagination,
} from '@shared/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { editCar } from '@shared/api'
import { useCarContext } from '../util-car-context/CarContext'

const useEditCar = () => {
  const queryClient = useQueryClient()
  const { openConfirmModal } = useConfirmModal()
  const { keyword, page, searchBy, status } = useCarContext()

  const mutation = useMutation<
    CarType,
    AxiosError<AxiosErrorData>,
    {
      id: number
      data: CarFormInput
    },
    unknown
  >({
    mutationFn: async ({ id, data }) => await editCar(id, data),
    onSuccess: (newCar) => {
      openConfirmModal({
        text: '차량 정보 수정에 성공했습니다.',
      })
      const queryData: OffsetPagination<CarType> | undefined =
        queryClient.getQueryData(['cars', { keyword, page, searchBy, status }])
      if (!queryData) return
      queryClient.setQueryData(['cars', { keyword, page, searchBy, status }], {
        ...queryData,
        data: queryData.data.map((car) => {
          if (car.id === newCar.id) {
            return newCar
          }
          return car
        }),
      })
    },
    onError: (error) => {
      const text =
        error?.response?.data?.message || '차량 정보 수정에 실패했습니다.'
      openConfirmModal({
        text,
      })
    },
  })

  return mutation
}

export default useEditCar
