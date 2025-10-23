import { createContext, FC, ReactElement, useCallback, useState } from 'react'

type ModalContextType = {
  isOpened: boolean
  openModal: (content: ReactElement) => void
  closeModal: () => void
  modalContent: null | ReactElement
}

const ConfirmModalContext = createContext<ModalContextType>({
  isOpened: false,
  openModal: () => undefined,
  closeModal: () => undefined,
  modalContent: null,
})
const { Provider } = ConfirmModalContext

const ConfirmModalProvider: FC<{ children: ReactElement }> = ({ children }) => {
  const [isOpened, setIsOpened] = useState<boolean>(false)
  const [modalContent, setModalContent] = useState<null | ReactElement>(null)

  const openModal = useCallback((content: ReactElement) => {
    setIsOpened(true)
    if (content) {
      setModalContent(content)
    }
  }, [])

  const closeModal = useCallback(() => {
    setIsOpened(false)
    setModalContent(null)
  }, [])

  return (
    <Provider
      value={{
        isOpened,
        openModal,
        closeModal,
        modalContent,
      }}
    >
      {modalContent}
      {children}
    </Provider>
  )
}

export { ConfirmModalContext, ConfirmModalProvider }
