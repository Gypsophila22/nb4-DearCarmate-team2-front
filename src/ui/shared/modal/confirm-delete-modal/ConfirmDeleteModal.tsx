import classNames from 'classnames/bind'
import styles from './ConfirmDeleteModal.module.scss'
import Button from '../../button/Button'

const cx = classNames.bind(styles)

type ConfirmDeleteModalProps = {
  onClose: () => void
  onSubmit: () => void
  deleteType: string
  itemName: string
}

const ConfirmDeleteModal = ({ onClose, onSubmit, deleteType, itemName }: ConfirmDeleteModalProps) => {
  return (
    <div className={cx('container')}>
      <h3 className={cx('title')}>{`${deleteType} 정보 삭제`}</h3>
      <p className={cx('text')}>
        <span className={cx('item')}>{itemName}</span>
        의 정보를 삭제하시겠습니까?
      </p>
      <div className={cx('buttonContainer')}>
        <Button
          size='small'
          theme='gray'
          onClick={(e) => {
            e.preventDefault()
            onClose()
          }}
        >취소
        </Button>
        <Button
          size='small'
          theme='red'
          onClick={
            (e) => {
              e.preventDefault()
              onSubmit()
              onClose()
            }}
        >삭제
        </Button>
      </div>
    </div>
  )
}

export default ConfirmDeleteModal
