import classNames from 'classnames/bind'
import styles from './FormModal.module.scss'
import { PropsWithChildren } from 'react'

const cx = classNames.bind(styles)

type FormModalProps = {
  title: string
}

const FormModal = ({ title, children }: PropsWithChildren<FormModalProps>) => {
  return (
    <div className={cx('container')}>
      <h3 className={cx('title')}>{title}</h3>
      {children}
    </div>
  )
}

export default FormModal
