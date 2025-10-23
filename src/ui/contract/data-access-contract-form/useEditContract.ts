import { AxiosError } from 'axios'
import useConfirmModal from '@ui/shared/modal/confirm-modal/useConfirmModal'
import { AxiosErrorData, ContractType, ContractsListType } from '@shared/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ContractEditFormInput, editContract } from '@shared/api'
import { useContractContext } from '../util-contract-context/ContractContext'

const useEditContract = () => {
  const queryClient = useQueryClient()
  const { openConfirmModal } = useConfirmModal()
  const { keyword, searchBy } = useContractContext()

  const mutation = useMutation<
    ContractType,
    AxiosError<AxiosErrorData>,
    {
      id: number
      data: ContractEditFormInput
    },
    unknown
  >({
    mutationFn: async ({ id, data }) => await editContract(id, data),
    onSuccess: (newContract) => {
      openConfirmModal({
        text: '계약 건 수정에 성공했습니다.',
      })
      const queryData: ContractsListType | undefined = queryClient.getQueryData(
        ['contracts', { keyword, searchBy }],
      )
      if (!queryData) return
      queryClient.setQueryData(['contracts', { keyword, searchBy }], {
        ...queryData,
        [newContract.status]: {
          ...queryData[newContract.status],
          data: queryData[newContract.status].data.map((contract) => {
            if (contract.id === newContract.id) {
              return newContract
            }
            return contract
          }),
        },
      })
      queryClient.invalidateQueries({ queryKey: ['customers'] })
    },
    onError: (error) => {
      const text =
        error?.response?.data?.message || '계약 건 수정에 실패했습니다.'
      openConfirmModal({
        text,
      })
    },
  })

  return mutation
}

export default useEditContract
