import classNames from 'classnames/bind'
import styles from './CustomerOptionButtons.module.scss'
import Icon from '@ui/shared/icon/Icon'
import { CustomerFormInput, CustomerType } from '@shared/types'
import useFormModal from '@ui/shared/modal/form-modal/useFormModal'
import useConfirmDeleteModal from '@ui/shared/modal/confirm-delete-modal/useConfirmDeleteModal'
import useEditCustomer from '../data-access-customer-form/useEditCustomer'
import useDeleteCustomer from '../data-access-customer-form/useDeleteCustomer'
import CustomerForm from '../feature-customer-form/CustomerForm'

const cx = classNames.bind(styles)

type CustomerOptionButtonsProps = {
  customer: CustomerType
}

const CustomerOptionButtons = ({ customer }: CustomerOptionButtonsProps) => {
  const { closeFormModal, openFormModal } = useFormModal()
  const { openConfirmDeleteModal } = useConfirmDeleteModal()
  const { mutate: editCustomer } = useEditCustomer()
  const { mutate: deleteCustomer } = useDeleteCustomer()

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, contractCount, ...defaultValues } = customer

  const handleEditCustomer = (data: CustomerFormInput) => {
    editCustomer({ data, id })
    closeFormModal()
  }

  return (
    <div className={cx('container')}>
      <button
        className={cx('button')}
        onClick={() => {
          openFormModal({
            title: '고객 정보 수정',
            form: <CustomerForm defaultValues={defaultValues} onCancel={closeFormModal} onSubmit={handleEditCustomer} />,
          })
        }}
      >
        <Icon name='edit' width={24} height={24} />
      </button>
      <button
        className={cx('button')}
        onClick={() => {
          openConfirmDeleteModal({
            deleteType: '고객',
            itemName: `${customer.name} 고객님`,
            onSubmit: () => deleteCustomer(id),
          })
        }}
      >
        <Icon name='delete' width={24} height={24} />
      </button>
    </div>
  )
}

export default CustomerOptionButtons
