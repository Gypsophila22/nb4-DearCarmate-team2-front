import Button from '@ui/shared/button/Button'
import useFormModal from '@ui/shared/modal/form-modal/useFormModal'
import ContractForm from '../feature-contract-form/ContractForm'
import { ContractFormInput } from '@shared/types'
import useRegisterContract from '../data-access-contract-form/useRegisterContract'

type ContractRegisterButtonProps = {

}

const ContractRegisterButton = ({ }: ContractRegisterButtonProps) => {
  const { openFormModal, closeFormModal } = useFormModal()
  const { mutate: registerContract } = useRegisterContract()

  const handleRegisterContract = (data: ContractFormInput) => {
    registerContract({
      ...data,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      meetings: data.meetings.map(({ id, ...rest }) => rest),
    })
    closeFormModal()
  }

  return (
    <Button
      onClick={() => {
        openFormModal({
          title: '계약 건 등록',
          form: <ContractForm onSubmit={handleRegisterContract} onCancel={closeFormModal} />,
        })
      }}
      size='small'
      theme='red'
    >계약 건 등록
    </Button>
  )
}

export default ContractRegisterButton
