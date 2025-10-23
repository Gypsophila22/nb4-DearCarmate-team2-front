import classNames from 'classnames/bind'
import styles from './AlarmField.module.scss'
import TextField from '@ui/shared/input/TextField/TextField'
import MinusButton from './MinusButton'
import Icon from '@ui/shared/icon/Icon'
import { AlarmDay, ContractFormInput } from '@shared/types'
import getAlarmDate from './getAlaramDate'
import { format } from 'date-fns'

const cx = classNames.bind(styles)

type AlarmFieldProps = {
  meeting: ContractFormInput['meetings'][0]
  onRemove: (meetingId: string) => void
  onToggleAlarm: (meetingId: string, day: AlarmDay) => void
}

const AlarmField = ({ meeting, onRemove, onToggleAlarm }: AlarmFieldProps) => {
  const todayAlarmDate = getAlarmDate(new Date(meeting.date), AlarmDay.today)
  const yesterdayAlarmDate = getAlarmDate(new Date(meeting.date), AlarmDay.yesterday)

  const isTodayAlarmActive = meeting.alarms.includes(todayAlarmDate)
  const isYesterdayAlarmActive = meeting.alarms.includes(yesterdayAlarmDate)

  return (
    <div className={cx('alarmField')}>
      <div className={cx('top')}>
        <TextField value={format(new Date(meeting.date), 'yyyy/MM/dd HH:mm')} disabled />
        <MinusButton onClick={() => onRemove(meeting.id)} />
      </div>
      <div className={cx('bottom')}>
        <div className={cx('label')}>
          <Icon name='clock' width={24} height={24} />
          <span>미리 알림</span>
        </div>
        <div className={cx('checkboxField')}>
          <div className={cx('checkbox')}>
            <button type='button' onClick={() => onToggleAlarm(meeting.id, AlarmDay.today)}>
              <Icon name={isTodayAlarmActive ? 'checkbox-active' : 'checkbox-inactive'} width={24} height={24} />
            </button>
            <span>당일 오전 9시</span>
          </div>
          <div className={cx('checkbox')}>
            <button type='button' onClick={() => onToggleAlarm(meeting.id, AlarmDay.yesterday)}>
              <Icon name={isYesterdayAlarmActive ? 'checkbox-active' : 'checkbox-inactive'} width={24} height={24} />
            </button>
            <span>작일 오전 9시</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AlarmField
