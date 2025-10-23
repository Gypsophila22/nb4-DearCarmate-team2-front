
import classNames from 'classnames/bind'

import styles from './TableContainer.module.scss'

const cx = classNames.bind(styles)

type TableContainerProps = {
} & React.ComponentPropsWithoutRef<'div'>

export const TableContainer = ({
  children,
  ...restProps
}: TableContainerProps) => {

  return (
    <div
      className={cx('container')}
      {...restProps}
    >
      {children}
    </div>
  )
}
