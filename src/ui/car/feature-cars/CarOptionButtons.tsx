import classNames from 'classnames/bind'
import styles from './CarOptionButtons.module.scss'
import Icon from '@ui/shared/icon/Icon'
import { CarFormInput, CarType } from '@shared/types'
import useFormModal from '@ui/shared/modal/form-modal/useFormModal'
import CarForm from '../feature-car-form/CarForm'
import useEditCar from '../data-access-car-form/useEditCar'
import useConfirmDeleteModal from '@ui/shared/modal/confirm-delete-modal/useConfirmDeleteModal'
import useDeleteCar from '../data-access-car-form/useDeleteCar'

const cx = classNames.bind(styles)

type CarOptionButtonsProps = {
  car: CarType
}

const CarOptionButtons = ({ car }: CarOptionButtonsProps) => {
  const { closeFormModal, openFormModal } = useFormModal()
  const { openConfirmDeleteModal } = useConfirmDeleteModal()
  const { mutate: editCar } = useEditCar()
  const { mutate: deleteCar } = useDeleteCar()

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, status, type, ...defaultValues } = car

  const handleEditCar = (data: CarFormInput) => {
    editCar({ data, id })
    closeFormModal()
  }

  return (
    <div className={cx('container')}>
      <button
        className={cx('button')}
        onClick={() => {
          openFormModal({
            title: '차량 정보 수정',
            form: <CarForm onSubmit={handleEditCar} onCancel={closeFormModal} defaultValues={defaultValues} />,
          })
        }}
      >
        <Icon name='edit' width={24} height={24} />
      </button>
      <button
        className={cx('button')}
        onClick={() => {
          openConfirmDeleteModal({
            deleteType: '차량',
            itemName: `${car.carNumber} 차량`,
            onSubmit: () => deleteCar(id),
          })
        }}
      >
        <Icon name='delete' width={24} height={24} />
      </button>
    </div>
  )
}

export default CarOptionButtons
