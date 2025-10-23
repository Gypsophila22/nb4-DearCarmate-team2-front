import classNames from 'classnames/bind'
import styles from './EmptyData.module.scss'
import Image from 'next/image'

const cx = classNames.bind(styles)

type EmptyDataProps = {

}

const EmptyData = ({ }: EmptyDataProps) => {
  return (
    <div className={cx('empty')}>
      <Image src='/images/empty.png' width={531} height={300} alt='데이터가 빈 테이블의 차량 이미지' />
      <p className={cx('text')}>아직 등록된 정보가 없습니다.</p>
    </div>
  )
}

export default EmptyData
