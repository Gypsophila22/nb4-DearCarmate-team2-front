import { useContext } from 'react'
import { TableHeadContext } from '../contexts'
import classNames from 'classnames/bind'
import styles from './TableCell.module.scss'

const cx = classNames.bind(styles)

type TableCellProps = {
  isLast?: boolean
} & (React.ComponentPropsWithoutRef<'th'> | React.ComponentPropsWithoutRef<'td'>)

export const TableCell = ({
  children,
  isLast = false,
  ...restProps
}: TableCellProps) => {
  const inHead = useContext(TableHeadContext)
  const Component = inHead ? 'th' : 'td'

  return (
    <Component
      className={cx('cell', { isLast })}
      onClick={isLast
        ? (e) => { e.stopPropagation() }
        : restProps.onClick}
      {...restProps}
    >
      {children}
    </Component>
  )
}
