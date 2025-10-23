import { ContractStatus, ContractType } from '@shared/types'
import useEditContractStatus from '../data-access-contract-form/useEditContractStatus'
import useFormModal from '@ui/shared/modal/form-modal/useFormModal'
import { useRef, useState } from 'react'
import ContractResolutionDateForm from '../feature-contract-form/ContractResolutionDateForm'
import { useDrag } from 'react-dnd'

const contractInProgressGroup: ContractStatus[] = [ContractStatus.carInspection, ContractStatus.priceNegotiation, ContractStatus.contractDraft]
const contractOutcomeGroup: ContractStatus[] = [ContractStatus.contractSuccessful, ContractStatus.contractFailed]

const useContractDrag = (data: ContractType, status: ContractStatus) => {
  const { mutateAsync: editContractStatusAsync } = useEditContractStatus()
  const { openFormModal, closeFormModal } = useFormModal()
  const [isLoading, setIsLoading] = useState(false)
  const dragRef = useRef(null)

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'CARD',
    item: { id: data.id },
    end: async (item, monitor) => {
      setIsLoading(true)
      try {
        const dropResult = monitor.getDropResult<{ name: ContractStatus }>()
        if (!dropResult) return
        if (dropResult.name === status) return

        const prevStatus = status
        const newStatus = dropResult.name

        if (contractInProgressGroup.includes(prevStatus) && contractInProgressGroup.includes(newStatus)) {
          await editContractStatusAsync({ id: item.id, data: { status: newStatus }, prevStatus })

        } else if (contractInProgressGroup.includes(prevStatus) && contractOutcomeGroup.includes(newStatus)) {
          openFormModal({
            title: `계약 ${newStatus === ContractStatus.contractSuccessful ? '성공' : '실패'} 등록`,
            form: <ContractResolutionDateForm
              onCancel={closeFormModal}
              onSubmit={async (data) => {
                closeFormModal()
                const { resolutionDate } = data
                await editContractStatusAsync({ id: item.id, data: { status: newStatus, resolutionDate }, prevStatus })
              }}
              type={newStatus}
            // eslint-disable-next-line react/jsx-closing-bracket-location
            />,
          })

        } else if (contractOutcomeGroup.includes(prevStatus) && contractInProgressGroup.includes(newStatus)) {
          await editContractStatusAsync({ id: item.id, data: { status: newStatus, resolutionDate: null }, prevStatus })

        } else if (contractOutcomeGroup.includes(prevStatus) && contractOutcomeGroup.includes(newStatus)) {
          return
        }
      } finally {
        setIsLoading(false)
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }))

  drag(dragRef)

  return { dragRef, isDragging, isLoading }
}

export default useContractDrag
