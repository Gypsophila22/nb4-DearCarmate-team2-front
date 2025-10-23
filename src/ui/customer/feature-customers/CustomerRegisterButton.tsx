import Button from '@ui/shared/button/Button'
import useFormModal from '@ui/shared/modal/form-modal/useFormModal'
import { CustomerFormInput } from '@shared/types'
import useRegisterCustomer from '../data-access-customer-form/useRegisterCustomer'
import CustomerForm from '../feature-customer-form/CustomerForm'

type CustomerRegisterButtonProps = {

}

const CustomerRegisterButton = ({ }: CustomerRegisterButtonProps) => {
  const { openFormModal, closeFormModal } = useFormModal()
  const { mutate: registerCustomer } = useRegisterCustomer()

  const handleRegisterCar = (data: CustomerFormInput) => {
    registerCustomer(data)
    closeFormModal()
  }

  return (
    <Button
      onClick={() => {
        openFormModal({
          title: '고객 정보 등록',
          form: <CustomerForm onSubmit={handleRegisterCar} onCancel={closeFormModal} />,
        })
      }}
      size='small'
      theme='red'
    >고객 등록
    </Button>
  )
}

export default CustomerRegisterButton
