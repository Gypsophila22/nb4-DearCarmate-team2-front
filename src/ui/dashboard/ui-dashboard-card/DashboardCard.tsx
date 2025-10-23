import classNames from 'classnames/bind'
import styles from './DashboardCard.module.scss'
import { DashboardCardType } from '@shared/types'
import Icon from '../../shared/icon/Icon'
import formatDashboardMoney from './formatDashboardMoney'

const cx = classNames.bind(styles)

type DashboardCardProps = {
  data: DashboardCardType
}

const DashboardCard = ({ data }: DashboardCardProps) => {
  const {
    completedContractsCount,
    growthRate,
    lastMonthSales,
    monthlySales,
    proceedingContractsCount,
  } = data

  return (
    <div className={cx('container')}>
      <div className={cx('item')}>
        <div className={cx('header')}>
          <Icon name='payments' width={20} height={20} />
          <h2 className={cx('title')}>이 달의 매출</h2>
        </div>
        <div className={cx('body')}>
          <div className={cx('compared')}>
            <div className={cx('growthRate')}>
              <Icon name={growthRate > 0 ? 'arrow-up-red' : 'arrow-down-blue'} width={18} height={18} />
              <div className={cx('value', { isIncreased: growthRate > 0 })}>
                {Math.abs(growthRate).toLocaleString(undefined, { style: 'percent', minimumFractionDigits: 1 })}
              </div>
            </div>
            <div className={cx('lastMonthSales')}>
              {`지난 달 : ${formatDashboardMoney(lastMonthSales)}`}
            </div>
          </div>
          <div className={cx('present')}>
            {formatDashboardMoney(monthlySales)}
          </div>
        </div>
      </div>
      <div className={cx('item')}>
        <div className={cx('header')}>
          <Icon name='processing' width={20} height={20} />
          <h2 className={cx('title')}>진행 중인 계약</h2>
        </div>
        <div className={cx('body')}>
          <div className={cx('compared')} />
          <div className={cx('present')}>
            {proceedingContractsCount}건
          </div>
        </div>
      </div>
      <div className={cx('item', 'last')}>
        <div className={cx('header')}>
          <Icon name='celebration' width={20} height={20} />
          <h2 className={cx('title')}>성사된 계약</h2>
        </div>
        <div className={cx('body')}>
          <div className={cx('compared')} />
          <div className={cx('present')}>
            {completedContractsCount}건
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardCard
