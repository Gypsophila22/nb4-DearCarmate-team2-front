/* eslint-disable react/jsx-closing-bracket-location */
import Kebab from '@ui/shared/kebab/Kebab'
import { ContractStatus, ContractType } from '@shared/types'
import useEditContract from '../data-access-contract-form/useEditContract'
import useConfirmDeleteModal from '@ui/shared/modal/confirm-delete-modal/useConfirmDeleteModal'
import useDeleteContract from '../data-access-contract-form/useDeleteContract'
import useFormModal from '@ui/shared/modal/form-modal/useFormModal'
import ContractPriceEditForm from '../feature-contract-form/ContractPriceEditForm'
import ContractForm from '../feature-contract-form/ContractForm'

type ContractOptionKebabProps = {
  contract: ContractType
}

const ContractOptionKebab = ({ contract }: ContractOptionKebabProps) => {
  const { id, status, customer: { name, id: customerId }, car: { model, id: carId }, user: { id: userId }, contractPrice, meetings } = contract

  const { openConfirmDeleteModal } = useConfirmDeleteModal()
  const { openFormModal, closeFormModal } = useFormModal()

  const { mutate: editContract } = useEditContract()
  const { mutate: deleteContract } = useDeleteContract()

  const getMenu = (status: ContractStatus): Array<{ text: string, onClick: () => void }> => {
    let menu = []
    if (status === ContractStatus.carInspection || status === ContractStatus.priceNegotiation || status === ContractStatus.contractDraft) {
      menu.push(
        {
          text: '계약 수정',
          onClick: () => {
            openFormModal({
              title: '계약 건 수정',
              form: <ContractForm
                onSubmit={(data) => {
                  // eslint-disable-next-line @typescript-eslint/no-unused-vars
                  editContract({ id, data: { ...data, meetings: data.meetings.map(({ id, ...rest }) => rest) } })
                  closeFormModal()
                }}
                defaultValues={{ meetings, customerId, carId, userId }}
                onCancel={closeFormModal} />,
            })
          },
        },
      )
    }

    if (status === ContractStatus.priceNegotiation) {
      menu.push(
        {
          text: '가격 수정',
          onClick: () => {
            openFormModal({
              title: '가격 수정',
              form: <ContractPriceEditForm
                onSubmit={(data) => {
                  editContract({ id, data })
                  closeFormModal()
                }}
                onCancel={closeFormModal}
                defaultContractPrice={contractPrice}
              />,
            })
          },
        },
      )
    }

    menu.push({
      text: '삭제',
      onClick: () => {
        openConfirmDeleteModal({
          deleteType: '계약',
          itemName: `${name} 고객님(${model})`,
          onSubmit: () => deleteContract({ id, status }),
        })
      },
    })

    return menu
  }

  return (
    <Kebab
      menus={getMenu(status)}
      record={id}
    />
  )
}

export default ContractOptionKebab
