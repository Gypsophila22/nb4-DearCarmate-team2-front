import { AxiosError } from 'axios'
import { useRouter } from 'next/router'
import useConfirmModal from '@ui/shared/modal/confirm-modal/useConfirmModal'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosErrorData, CarType, OffsetPagination } from '@shared/types'
import useUpdateQueryURL from '@ui/shared/util-hook/useUpdateQueryURL'
import { deleteCar } from '@shared/api'
import { useCarContext } from '../util-car-context/CarContext'

const useDeleteCar = () => {
  const queryClient = useQueryClient()
  const { openConfirmModal } = useConfirmModal()
  const { keyword, page, searchBy, status } = useCarContext()

  const router = useRouter()
  const { updateQueryURL } = useUpdateQueryURL()

  const mutation = useMutation<
    { message: string },
    AxiosError<AxiosErrorData>,
    number,
    unknown
  >({
    mutationFn: async (id) => await deleteCar(id),
    onSuccess: async () => {
      openConfirmModal({
        text: '차량 정보 삭제에 성공했습니다.',
      })
      const queryData: OffsetPagination<CarType> | undefined =
        queryClient.getQueryData(['cars', { keyword, page, searchBy, status }])
      if (!queryData) return
      const { data } = queryData
      if (data.length <= 1 && page > 1)
        await router.push(updateQueryURL({ page: page - 1 }), undefined, {
          scroll: false,
        })
      queryClient.invalidateQueries({ queryKey: ['cars'] })
    },
    onError: (error) => {
      const text =
        error?.response?.data?.message || '차량 정보 삭제에 실패했습니다.'
      openConfirmModal({
        text,
      })
    },
  })

  return mutation
}

export default useDeleteCar
