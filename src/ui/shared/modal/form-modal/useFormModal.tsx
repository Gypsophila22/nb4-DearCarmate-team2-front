import { useContext } from 'react'
import ModalBase from '../ModalBase'
import { FormModalContext } from './formModalContext'
import FormModal from './FormModal'

type FormModalArgs = {
  title: string
  form: React.ReactNode
}

const useFormModal = () => {
  const { closeModal, isOpened, openModal } = useContext(FormModalContext)

  const openFormModal = ({ title, form }: FormModalArgs) => {
    openModal(
      <ModalBase
        type='form'
        onClose={closeModal}
      >
        <FormModal
          title={title}
        >
          {form}
        </FormModal>
      </ModalBase>,
    )
  }

  return { openFormModal, isOpened, closeFormModal: closeModal }
}
export default useFormModal
