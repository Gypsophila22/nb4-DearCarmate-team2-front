import { useContext } from 'react'
import { CustomerType } from '@shared/types'
import { ConfirmModalContext } from '@ui/shared/modal/confirm-modal/confirmModalContext'
import CustomerDetailModal from './CustomerDetailModal'
import ModalBase from '@ui/shared/modal/ModalBase'

type CustomerDetailModalArgs = {
  data: CustomerType
}

const useCustomerDetailModal = () => {
  const { closeModal, isOpened, openModal } = useContext(ConfirmModalContext)

  const openCustomerDetailModal = ({ data }: CustomerDetailModalArgs) => {
    openModal(
      <ModalBase
        type='confirm'
        onClose={closeModal}
      >
        <CustomerDetailModal
          data={data}
          onClose={closeModal}
        />
      </ModalBase>,
    )
  }

  return { openCustomerDetailModal, isOpened, closeCustomerDetailModal: closeModal }
}

export default useCustomerDetailModal
