import classNames from 'classnames/bind'
import styles from './TableHead.module.scss'
import { TableHeadContext } from '../contexts'

const cx = classNames.bind(styles)

type TableHeadProps = {

} & React.ComponentPropsWithoutRef<'thead'>

export const TableHead = ({
  children,
  ...restProps
}: TableHeadProps) => {
  return (
    <TableHeadContext.Provider value={true}>
      <thead
        className={cx('head')}
        {...restProps}
      >
        {children}
      </thead>
    </TableHeadContext.Provider>
  )
}
