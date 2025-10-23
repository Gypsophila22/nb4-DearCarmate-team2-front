import { useContext } from 'react'
import { FormModalContext } from '../form-modal/formModalContext'
import ModalBase from '../ModalBase'
import ConfirmDeleteModal from './ConfirmDeleteModal'

type ConfirmDeleteModalArgs = {
  onSubmit: () => void
  deleteType: string
  itemName: string
}

const useConfirmDeleteModal = () => {
  const { closeModal, isOpened, openModal } = useContext(FormModalContext)

  const openConfirmDeleteModal = ({ onSubmit, deleteType, itemName }: ConfirmDeleteModalArgs) => {
    openModal(
      <ModalBase
        type='confirm'
        onClose={closeModal}
      >
        <ConfirmDeleteModal
          onClose={closeModal}
          onSubmit={onSubmit}
          deleteType={deleteType}
          itemName={itemName}
        />
      </ModalBase>,
    )
  }

  return { openConfirmDeleteModal, isOpened, closeConfirmDeleteModal: closeModal }
}

export default useConfirmDeleteModal
