import classNames from 'classnames/bind'
import styles from './Loader.module.scss'

const cx = classNames.bind(styles)

type LoaderProps = {
}

const Loader = ({ }: LoaderProps) => {
  return (
    <div className={cx('container')}>
      <div className={cx('loader')} />
    </div>
  )
}

export default Loader
