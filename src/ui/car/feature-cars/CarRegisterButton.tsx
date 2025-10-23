import Button from '@ui/shared/button/Button'
import useFormModal from '@ui/shared/modal/form-modal/useFormModal'
import CarForm from '../feature-car-form/CarForm'
import useRegisterCar from '../data-access-car-form/useRegisterCar'
import { CarFormInput } from '@shared/types'

type CarRegisterButtonProps = {

}

const CarRegisterButton = ({ }: CarRegisterButtonProps) => {
  const { openFormModal, closeFormModal } = useFormModal()
  const { mutate: registerCar } = useRegisterCar()

  const handleRegisterCar = (data: CarFormInput) => {
    registerCar(data)
    closeFormModal()
  }

  return (
    <Button
      onClick={() => {
        openFormModal({
          title: '차량 정보 등록',
          form: <CarForm onSubmit={handleRegisterCar} onCancel={closeFormModal} />,
        })
      }}
      size='small'
      theme='red'
    >차량 등록
    </Button>
  )
}

export default CarRegisterButton
