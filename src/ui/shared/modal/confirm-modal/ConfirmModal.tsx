import classNames from 'classnames/bind'
import styles from './ConfirmModal.module.scss'
import Button from '@ui/shared/button/Button'

const cx = classNames.bind(styles)

type ConfirmModalProps = {
  text: string
  onClose: () => void
}

const ConfirmModal = ({ onClose, text }: ConfirmModalProps) => {
  return (
    <div className={cx('container')}>
      <p className={cx('text')}>{text}</p>
      <Button theme='red' size='small' onClick={(e) => { e.preventDefault(); onClose() }}>확인</Button>
    </div>
  )
}

export default ConfirmModal
