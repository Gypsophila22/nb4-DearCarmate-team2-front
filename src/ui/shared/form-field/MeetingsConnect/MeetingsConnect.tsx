import classNames from 'classnames/bind'
import styles from './MeetingsConnect.module.scss'
import { Controller, ControllerProps, useFormContext } from 'react-hook-form'
import DatePicker from '@ui/shared/input/DatePicker/DatePicker'
import { AlarmDay, ContractFormInput } from '@shared/types'
import { MutableRefObject, useRef } from 'react'
import Button from '@ui/shared/button/Button'
import AlarmField from './AlarmField'
import { v4 as uuidv4 } from 'uuid'
import getAlarmDate from './getAlaramDate'

const cx = classNames.bind(styles)

type MeetingsConnectProps = {
  rules?: ControllerProps['rules']
}

const MeetingsConnect = ({ rules }: MeetingsConnectProps) => {
  const { setValue, setError, watch } = useFormContext<ContractFormInput>()
  const meetings = watch('meetings')
  const selectedDateRef: MutableRefObject<string | undefined> = useRef()

  const handleAddMeeting = () => {
    if (!selectedDateRef.current) return
    if (meetings.length >= 3) return setError('meetings', { type: 'maxLength', message: '미팅 일정은 최대 3개까지 등록됩니다.' })
    setValue('meetings', [...meetings, { id: uuidv4(), date: selectedDateRef.current, alarms: [] }])
  }

  const handleRemoveMeeting = (meetingId: string) => {
    setValue('meetings', meetings.filter((meeting) => meeting.id !== meetingId))
  }

  const handleToggleAlarm = (meetingId: string, day: AlarmDay) => {
    setValue('meetings', meetings.map((meeting) => {
      if (!(meeting.id === meetingId)) return meeting

      const alarmDate = getAlarmDate(new Date(meeting.date), day)
      const index = meeting.alarms.indexOf(alarmDate)

      const newAlarms = [...meeting.alarms]
      if (index > -1) newAlarms.splice(index, 1)
      else newAlarms.push(alarmDate)

      return { ...meeting, alarms: newAlarms }
    }))
  }

  return (
    <Controller
      name='meetings'
      rules={rules}
      render={({ fieldState }) => (
        <div className={cx('container')}>
          <div className={cx('dateField')}>
            <DatePicker
              onChange={(date) => selectedDateRef.current = date}
              showTimeSelect
              restrictToFuture
              placeholderText='미팅 일정을 선택해주세요'
              error={Boolean(fieldState.error)}
              helperText={fieldState.error?.message}
            />
            <Button onClick={handleAddMeeting} size='small' theme='outline' style={{ height: '48px' }}>+ 일정추가</Button>
          </div>
          <div className={cx('alarms')}>
            {meetings.map((meeting) => (
              <AlarmField
                key={meeting.id}
                meeting={meeting}
                onRemove={handleRemoveMeeting}
                onToggleAlarm={handleToggleAlarm}
              />
            ))}
          </div>
        </div>
      )}
    />
  )
}

export default MeetingsConnect
