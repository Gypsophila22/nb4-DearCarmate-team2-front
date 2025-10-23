import classNames from 'classnames/bind'
import styles from './CustomerDetailModal.module.scss'
import { CustomerType } from '@shared/types'
import Button from '@ui/shared/button/Button'
import { Column } from '@ui/shared/table/types'
import { CUSTOMER_GENDER_MAP } from '@ui/shared/util-constants/constants'

const cx = classNames.bind(styles)

type CustomerDetailModalProps = {
  onClose: () => void
  data: CustomerType
}

const fields: Column<CustomerType>[] = [
  { key: 'name', title: '고객명' },
  { key: 'gender', title: '성별' },
  { key: 'phoneNumber', title: '연락처' },
  { key: 'ageGroup', title: '연령대' },
  { key: 'region', title: '지역' },
  { key: 'email', title: '이메일' },
  { key: 'memo', title: '메모' },
]

const CustomerDetailModal = ({ data, onClose }: CustomerDetailModalProps) => {
  const processedData = {
    ...data,
    gender: CUSTOMER_GENDER_MAP[data.gender],
    ageGroup: data.ageGroup || '-',
    region: data.region || '-',
    memo: data.memo || '-',
  }
  return (
    <div className={cx('container')}>
      <h3 className={cx('title')}>고객 정보 상세</h3>
      <div className={cx('contentContainer')}>
        {fields.map((field) => (
          <div key={field.key} className={cx('field')}>
            <div className={cx('label')}>{field.title}</div>
            <div className={cx('value', { 'memo': field.key === 'memo' })}>{processedData[field.key]}</div>
          </div>
        ))}
      </div>
      <div className={cx('buttonWrapper')}>
        <Button
          onClick={(e) => {
            e.preventDefault()
            onClose()
          }}
          size='small'
          theme='red'
        >확인
        </Button>
      </div>
    </div>
  )
}

export default CustomerDetailModal
