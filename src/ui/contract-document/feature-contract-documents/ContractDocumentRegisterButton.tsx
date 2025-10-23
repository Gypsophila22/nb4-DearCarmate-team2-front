import Button from '@ui/shared/button/Button'
import useFormModal from '@ui/shared/modal/form-modal/useFormModal'
import { ContractDocumentRegisterFormInput } from '@shared/types'
import useRegisterContractDocuments from '../data-access-contract-document-form/useRegisterContractDocuments'
import ContractDocumentRegisterForm from '../feature-contract-document-form/ContractDocumentRegisterForm'

type ContractDocumentRegisterButtonProps = {

}

const ContractDocumentRegisterButton = ({ }: ContractDocumentRegisterButtonProps) => {
  const { openFormModal, closeFormModal } = useFormModal()
  const { mutate: registerContractDocuments } = useRegisterContractDocuments()

  const handleRegisterContractDocument = (data: ContractDocumentRegisterFormInput) => {
    registerContractDocuments(data)
    closeFormModal()
  }

  return (
    <Button
      onClick={() => {
        openFormModal({
          title: '계약서 추가',
          form: <ContractDocumentRegisterForm onClose={closeFormModal} onSubmit={handleRegisterContractDocument} />,
        })
      }}
      size='small'
      theme='red'
    >계약서 추가
    </Button>
  )
}

export default ContractDocumentRegisterButton
