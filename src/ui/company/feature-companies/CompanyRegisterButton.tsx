import Button from '@ui/shared/button/Button'
import useFormModal from '@ui/shared/modal/form-modal/useFormModal'
import { CompanyFormInput } from '@shared/types'
import useRegisterCompany from '../data-access-company-form/useRegisterCompany'
import CompanyForm from '../feature-company-form/CompanyForm'

type CompanyRegisterButtonProps = {

}

const CompanyRegisterButton = ({ }: CompanyRegisterButtonProps) => {
  const { openFormModal, closeFormModal } = useFormModal()
  const { mutate: registerCompany } = useRegisterCompany()

  const handleRegisterCompany = (data: CompanyFormInput) => {
    registerCompany(data)
    closeFormModal()
  }

  return (
    <Button
      onClick={() => {
        openFormModal({
          title: '기업 등록',
          form: <CompanyForm onCancel={closeFormModal} onSubmit={handleRegisterCompany} />,
        })
      }}
      size='small'
      theme='red'
    >기업 등록
    </Button>
  )
}

export default CompanyRegisterButton
