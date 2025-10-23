import classNames from 'classnames/bind'
import styles from './CarDetailModal.module.scss'
import { CarType } from '@shared/types'
import Button from '@ui/shared/button/Button'
import { Column } from '@ui/shared/table/types'
import { CAR_STATUS_MAP } from '@ui/shared/util-constants/constants'

const cx = classNames.bind(styles)

type CarDetailModalProps = {
  onClose: () => void
  data: CarType
}

const fields: Column<CarType>[] = [
  { key: 'carNumber', title: '차량번호' },
  { key: 'manufacturer', title: '제조사' },
  { key: 'model', title: '차종' },
  { key: 'manufacturingYear', title: '제조년도(년)' },
  { key: 'mileage', title: '주행거리(km)' },
  { key: 'price', title: '가격(원)' },
  { key: 'status', title: '상태' },
  { key: 'accidentCount', title: '사고횟수(회)' },
  { key: 'explanation', title: '차량설명' },
  { key: 'accidentDetails', title: '사고상세' },
]

const CarDetailModal = ({ data, onClose }: CarDetailModalProps) => {
  const processedData = {
    ...data,
    status: CAR_STATUS_MAP[data.status],
    mileage: data.mileage.toLocaleString(),
    price: data.price.toLocaleString(),
    explanation: data.explanation || '-',
    accidentDetails: data.accidentDetails || '-',
  }
  return (
    <div className={cx('container')}>
      <h3 className={cx('title')}>차량 정보 상세</h3>
      <div className={cx('contentContainer')}>
        {fields.map((field) => (
          <div key={field.key} className={cx('field')}>
            <div className={cx('label')}>{field.title}</div>
            <div className={cx('value', { 'explanation': field.key === 'explanation' })}>{processedData[field.key]}</div>
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

export default CarDetailModal
