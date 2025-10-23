import { useContext } from 'react'
import { CarType } from '@shared/types'
import { ConfirmModalContext } from '@ui/shared/modal/confirm-modal/confirmModalContext'
import CarDetailModal from './CarDetailModal'
import ModalBase from '@ui/shared/modal/ModalBase'

type CarDetailModalArgs = {
  data: CarType
}

const useCarDetailModal = () => {
  const { closeModal, isOpened, openModal } = useContext(ConfirmModalContext)

  const openCarDetailModal = ({ data }: CarDetailModalArgs) => {
    openModal(
      <ModalBase
        type='confirm'
        onClose={closeModal}
      >
        <CarDetailModal
          data={data}
          onClose={closeModal}
        />
      </ModalBase>,
    )
  }

  return { openCarDetailModal, isOpened, closeCarDetailModal: closeModal }
}

export default useCarDetailModal
