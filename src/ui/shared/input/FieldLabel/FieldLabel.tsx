import classNames from 'classnames/bind'
import styles from './FieldLabel.module.scss'

const cx = classNames.bind(styles)

type FieldLabelProps = {
  label: string
  marginBottom?: string
  required?: boolean
}

const FieldLabel = ({ label, marginBottom = '12px', required = false }: FieldLabelProps) => {
  return (
    <div className={cx('container')} style={{ marginBottom }}>
      {required ? '*' : ''}{label}
    </div>
  )
}

export default FieldLabel
