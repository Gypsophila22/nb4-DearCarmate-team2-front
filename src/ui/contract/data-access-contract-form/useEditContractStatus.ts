import { AxiosError } from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import useConfirmModal from '@ui/shared/modal/confirm-modal/useConfirmModal'
import {
  AxiosErrorData,
  ContractStatus,
  ContractType,
  ContractsListType,
} from '@shared/types'
import { ContractStatusEditFormInput, editContractStatus } from '@shared/api'
import { useContractContext } from '../util-contract-context/ContractContext'

const useEditContractStatus = () => {
  const queryClient = useQueryClient()
  const { openConfirmModal } = useConfirmModal()
  const { keyword, searchBy } = useContractContext()

  const mutation = useMutation<
    ContractType,
    AxiosError<AxiosErrorData>,
    {
      id: number
      data: ContractStatusEditFormInput
      prevStatus: ContractStatus
    },
    unknown
  >({
    mutationFn: async ({ id, data }) => await editContractStatus(id, data),
    onSuccess: (newContract, { id, data, prevStatus }) => {
      const queryData: ContractsListType | undefined = queryClient.getQueryData(
        ['contracts', { keyword, searchBy }],
      )
      if (!queryData) return
      queryClient.setQueryData(['contracts', { keyword, searchBy }], {
        ...queryData,
        [data.status]: {
          data: [...queryData[data.status].data, newContract],
          totalItemCount: queryData[data.status].totalItemCount + 1,
        },
        [prevStatus]: {
          data: queryData[prevStatus].data.filter(
            (contract) => contract.id !== id,
          ),
          totalItemCount: queryData[prevStatus].totalItemCount - 1,
        },
      })
      queryClient.invalidateQueries({ queryKey: ['customers'] })
    },
    onError: (error) => {
      const text =
        error?.response?.data?.message || '계약 건 상태 수정에 실패했습니다.'
      openConfirmModal({
        text,
      })
    },
  })

  return mutation
}

export default useEditContractStatus
