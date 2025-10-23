import { AlarmDay } from '@shared/types'
import { format, setHours, setMinutes, setSeconds, subDays } from 'date-fns'

const getAlarmDate = (date: Date, day: AlarmDay) => {
  const subDay = day === AlarmDay.today ? 0 : 1
  const alarmDate = subDays(date, subDay)
  return format(setHours(setMinutes(setSeconds(alarmDate, 0), 0), 9), 'yyyy-MM-dd\'T\'HH:mm:ss')
}

export default getAlarmDate
