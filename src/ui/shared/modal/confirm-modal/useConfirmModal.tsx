import { useContext } from 'react'
import { ConfirmModalContext } from './confirmModalContext'
import ModalBase from '../ModalBase'
import ConfirmModal from './ConfirmModal'

type ConfirmModalArgs = {
  text: string
  onCloseSuccess?: () => void
}

const useConfirmModal = () => {
  const { closeModal, isOpened, openModal } = useContext(ConfirmModalContext)

  const openConfirmModal = ({ text, onCloseSuccess }: ConfirmModalArgs) => {
    openModal(
      <ModalBase
        type='confirm'
        onClose={closeModal}
      >
        <ConfirmModal
          text={text}
          onClose={() => {
            closeModal()
            if (onCloseSuccess) onCloseSuccess()
          }}
        />
      </ModalBase>,
    )
  }

  return { openConfirmModal, isOpened }
}

export default useConfirmModal
