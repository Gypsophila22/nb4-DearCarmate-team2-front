import classNames from 'classnames/bind'
import styles from './TableRow.module.scss'

const cx = classNames.bind(styles)

type TableRowProps = {

} & React.ComponentPropsWithoutRef<'tr'>

export const TableRow = ({
  children,
  ...restProps
}: TableRowProps) => {
  return (
    <tr
      className={cx('row', { rowClick: Boolean(restProps.onClick) })}
      {...restProps}
    >
      {children}
    </tr>
  )
}
