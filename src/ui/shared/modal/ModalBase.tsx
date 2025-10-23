import classNames from 'classnames/bind'
import styles from './ModalBase.module.scss'
import { Portal } from '../portal/Portal'
import { MouseEventHandler, useEffect } from 'react'

const cx = classNames.bind(styles)

type ModalBaseProps = {
  children: React.ReactNode
  onClose: () => void
  type: 'confirm' | 'form'
  selector?: string
}

const ModalBase = ({
  onClose,
  children,
  type,
  selector = `#${type}`,
  ...restProps
}: ModalBaseProps) => {

  const handleClickOverlay: MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'initial'
    }
  }, [])

  return (
    <Portal selector={selector}>
      <section
        className={cx('overlay')}
        id='overlay'
        onClick={handleClickOverlay}
      >
        <div
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              onClose()
            }
          }}
          className={cx('container', type)}
          {...restProps}
        >
          {children}
        </div>
      </section>
    </Portal>
  )
}

export default ModalBase
