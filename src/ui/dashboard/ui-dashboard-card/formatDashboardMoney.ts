const formatDashboardMoney = (value: number) => {
  const units = [
    { unit: '만', value: 10000 },
    { unit: '억', value: 100000000 },
    { unit: '조', value: 1000000000000 },
    { unit: '경', value: 10000000000000000 },
  ]

  for (let checkingIndex = units.length - 1; checkingIndex >= 0; checkingIndex--) {
    if (value >= units[checkingIndex].value) {
      const devidedValue = value / units[checkingIndex].value
      return devidedValue.toFixed(devidedValue < 10 ? 1 : 0) + units[checkingIndex].unit + ' 원'
    }
  }

  return `${value.toLocaleString()}원`
}

export default formatDashboardMoney
