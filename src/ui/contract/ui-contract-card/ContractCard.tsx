import classNames from 'classnames/bind'
import styles from './ContractCard.module.scss'
import { ContractType } from '@shared/types'
import Icon from '../../shared/icon/Icon'
import formatDateField from '../util-contract-card/formatDateField'
import ContractOptionKebab from '../feature-contracts/ContractOptionKebab'
import useContractDrag from '../util-contract-drag/useContractDrag'
import GlobalLoading from '@ui/shared/global-loading/GlobalLoading'

const cx = classNames.bind(styles)

type ContractCardProps = {
  data: ContractType
}

const ContractCard = ({ data }: ContractCardProps) => {
  const { car, customer, user, status, resolutionDate, meetings, contractPrice } = data
  const { dragRef, isDragging, isLoading } = useContractDrag(data, status)

  return (
    <div ref={dragRef} className={cx('container', { isDragging, isLoading })}>
      <div className={cx('header')}>
        <div className={cx('info')}>
          <h3 className={cx('customer')}>{`${customer.name} 고객님`}</h3>
          <h3 className={cx('model')}>{car.model}</h3>
        </div>
        <ContractOptionKebab contract={data} />
      </div>
      <div className={cx('body')}>
        <div className={cx('field', 'price')}>
          <Icon name='price' width={18} height={18} />
          <h4 className={cx('text')}>{`${contractPrice.toLocaleString()}원`}</h4>
        </div>
        <div className={cx('field', 'user')}>
          <Icon name='manager' width={18} height={18} />
          <h4 className={cx('text')}>{user.name}</h4>
        </div>
      </div>
      <p className={cx('date')}>
        {formatDateField(status, resolutionDate, meetings)}
      </p>
      {isLoading && (
        <GlobalLoading />
      )}
    </div>
  )
}

export default ContractCard
