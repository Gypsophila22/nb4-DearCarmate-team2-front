import { AxiosError } from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import useConfirmModal from '@ui/shared/modal/confirm-modal/useConfirmModal'
import { AxiosErrorData, ContractStatus, ContractsListType } from '@shared/types'
import { deleteContract } from '@shared/api'
import { useContractContext } from '../util-contract-context/ContractContext'

const useDeleteContract = () => {
  const queryClient = useQueryClient()
  const { openConfirmModal } = useConfirmModal()
  const { keyword, searchBy } = useContractContext()

  const mutation = useMutation<
    { message: string },
    AxiosError<AxiosErrorData>,
    { id: number, status: ContractStatus },
    unknown
  >({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    mutationFn: async ({ id, status }) => await deleteContract(id),
    onSuccess: async (_, { id, status }) => {
      openConfirmModal({
        text: '계약 건 삭제에 성공했습니다.',
      })
      const queryData: ContractsListType | undefined = queryClient.getQueryData(['contracts', { keyword, searchBy }])
      if (!queryData) return
      queryClient.setQueryData(['contracts', { keyword, searchBy }], {
        ...queryData,
        [status]: {
          totalItemCount: queryData[status].totalItemCount - 1,
          data: queryData[status].data.filter((contract) => contract.id !== id),
        },
      })
      queryClient.invalidateQueries({ queryKey: ['customers'] })
    },
    onError: (error) => {
      const text = error?.response?.data?.message || '계약 건 삭제에 실패했습니다.'
      openConfirmModal({
        text,
      })
    },
  })

  return mutation
}

export default useDeleteContract
