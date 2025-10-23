import classNames from 'classnames/bind'
import styles from './MinusButton.module.scss'

const cx = classNames.bind(styles)

type MinusButtonProps = {
  onClick: () => void
}

const MinusButton = ({ onClick }: MinusButtonProps) => {
  return (
    <button type='button' className={cx('container')} onClick={onClick}>
      <span className={cx('minus')} />
    </button>
  )
}

export default MinusButton
