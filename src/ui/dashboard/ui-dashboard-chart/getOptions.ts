import { ChartOptions } from 'chart.js'

const getOptions = (type: 'contracts' | 'sales') => {
  const CHART_OPTIONS: ChartOptions<'bar'> = {
    aspectRatio: 333 / 210,
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 10,
            weight: 400,
          },
          padding: 0,
          color: '#4a4a4a',
        },
        border: {
          display: false,
        },
      },
      y: {
        grid: {
          color: '#f3f5fb',
          lineWidth: 1,
        },
        ticks: {
          font: {
            size: 10,
            weight: 400,
          },
          padding: 0,
          color: '#888888',
          stepSize: type === 'contracts' ? 1 : 100,
          callback: (tick, index) => {
            const value = type === 'contracts' ? tick : tick.toLocaleString()
            if (index === 0) return `${value}(${type === 'contracts' ? '건' : '만 원'})`
            return value
          },
        },
        border: {
          display: false,
        },
        beginAtZero: true,
      },
    },
    plugins: {
      tooltip: {
        backgroundColor: '#212121',
        padding: 10,
        xAlign: 'center',
        yAlign: 'bottom',
        titleFont: { size: 10, weight: 400 },
        bodyFont: { size: 10, weight: 400 },
        displayColors: false,
        callbacks: {
          label: (ctx) => `${ctx.formattedValue}${type === 'contracts' ? '건' : '만 원'}`,
        },
      },
    },
  }

  return CHART_OPTIONS
}

export default getOptions
