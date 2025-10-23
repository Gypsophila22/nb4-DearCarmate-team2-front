import classNames from 'classnames/bind'
import styles from './GlobalLoading.module.scss'
import { Portal } from '../portal/Portal'
import Loader from '../loader/Loader'

const cx = classNames.bind(styles)

type GlobalLoadingProps = {
  hasBackDrop?: boolean
}

const GlobalLoading = ({ hasBackDrop = false }: GlobalLoadingProps) => {
  return (
    <Portal selector='#loading'>
      <section className={cx('overlay', { hasBackDrop })}>
        <Loader />
      </section>
    </Portal>
  )
}

export default GlobalLoading
