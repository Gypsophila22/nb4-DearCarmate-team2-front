import { TableBodyContext } from '../contexts'
import classNames from 'classnames/bind'
import styles from './TableBody.module.scss'

const cx = classNames.bind(styles)

type TableBodyProps = {

} & React.ComponentPropsWithoutRef<'tbody'>

export const TableBody = ({
  children,
  ...restProps
}: TableBodyProps) => {
  return (
    <TableBodyContext.Provider value={true}>
      <tbody
        className={cx('body')}
        {...restProps}
      >
        {children}
      </tbody>
    </TableBodyContext.Provider>
  )
}
