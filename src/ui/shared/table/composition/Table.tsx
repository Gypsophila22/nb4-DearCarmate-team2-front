import classNames from 'classnames/bind'
import styles from './Table.module.scss'

const cx = classNames.bind(styles)

type TableProps = {
} & React.ComponentPropsWithoutRef<'table'>

export const Table = ({
  children,
  ...restProps
}: TableProps) => {

  return (
    <table
      className={cx('table')}
      {...restProps}
    >
      {children}
    </table>
  )
}
