import classNames from 'classnames/bind'
import styles from './Dashboard.module.scss'
import useDashboardData from '../data-access-dashboard/useDashboardData'
import DashboardCard from '../ui-dashboard-card/DashboardCard'
import DashboardChart from '../ui-dashboard-chart/DashboardChart'
import Loader from '@ui/shared/loader/Loader'

const cx = classNames.bind(styles)

type DashboardProps = {

}

const Dashboard = ({ }: DashboardProps) => {
  const { data, isLoading } = useDashboardData()
  if (isLoading || !data) return (
    <div className={cx('loading')}>
      <Loader />
    </div>
  )

  const {
    completedContractsCount,
    growthRate,
    lastMonthSales,
    monthlySales,
    proceedingContractsCount,
    contractsByCarType,
    salesByCarType,
  } = data
  return (
    <div className={cx('container')}>
      <DashboardCard data={{ completedContractsCount, growthRate, lastMonthSales, monthlySales, proceedingContractsCount }} />
      <div className={cx('chartsContainer')}>
        <DashboardChart type='contracts' data={contractsByCarType} />
        <DashboardChart type='sales' data={salesByCarType} />
      </div>
    </div>
  )
}

export default Dashboard
