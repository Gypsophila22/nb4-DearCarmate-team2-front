import classNames from 'classnames/bind'
import styles from './DashboardChart.module.scss'
import {
  Chart as ChartJS,
  CategoryScale,
  BarElement,
  Tooltip,
  LinearScale,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import getOptions from './getOptions'
import { DashboardChartType } from '@shared/types'

ChartJS.register(CategoryScale,
  LinearScale,
  BarElement,
  Tooltip)

const cx = classNames.bind(styles)

type DashboardChartProps = {
  type: 'contracts' | 'sales'
  data: DashboardChartType['contractsByCarType']
}

const DashboardChart = ({ type, data }: DashboardChartProps) => {
  const carLabels = data.map(({ carType }) => carType)
  const counts = data.map(({ count }) => count)
  const title = `차량타입별 ${type === 'contracts' ? '계약수' : '매출액'}`
  return (
    <div className={cx('container')}>
      <h2 className={cx('title')}>{title}</h2>
      <Bar
        data={{
          labels: carLabels,
          datasets: [
            {
              data: counts,
              backgroundColor: '#c41013',
              borderRadius: 4,
              barThickness: 4,
            },
          ],
        }}
        options={{
          ...getOptions(type),
        }}
      />
    </div>
  )
}

export default DashboardChart
