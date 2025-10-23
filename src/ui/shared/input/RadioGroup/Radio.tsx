import classNames from 'classnames/bind'
import styles from './Radio.module.scss'

const cx = classNames.bind(styles)

type RadioProps = {
  selected?: boolean
  onClick: () => void
  label: string
}

const Radio = ({ onClick, selected = false, label }: RadioProps) => {
  return (
    <div
      className={cx('container', { selected })}
      onClick={onClick}
    >
      <span className={cx('outerCircle')}>
        <span className={cx('innerCircle')} />
      </span>
      <span className={cx('label')}>{label}</span>
    </div>
  )
}

export default Radio
