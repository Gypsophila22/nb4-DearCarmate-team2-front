import { forwardRef, useState } from 'react'
import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker'
import TextField from '../TextField/TextField'
import { ko } from 'date-fns/locale'
import Icon from '@ui/shared/icon/Icon'
import 'react-datepicker/dist/react-datepicker.css'
import classNames from 'classnames/bind'
import styles from './DatePicker.module.scss'
import { format, setHours, setMinutes } from 'date-fns'

const cx = classNames.bind(styles)

export type DatePickerProps = {
  error?: boolean
  helperText?: string
  disabled?: boolean
  onChange: (date: string) => void
  restrictToFuture?: boolean
} & Omit<Partial<ReactDatePickerProps>, 'onChange'>

const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(({
  error = false,
  helperText,
  disabled = false,
  onChange,
  value,
  restrictToFuture = false,
  ...restProps
}, ref) => {
  const [date, setDate] = useState<Date | undefined>(value ? new Date(value) : undefined)

  const handleChange = (date: Date) => {
    setDate(date)
    onChange(format(date, 'yyyy-MM-dd\'T\'HH:mm:ss'))
  }

  const currentDate = new Date()
  const dateRestrictions = restrictToFuture ? {
    minDate: currentDate,
    minTime: setHours(setMinutes(new Date(), 30), 9),
    maxTime: setHours(setMinutes(new Date(), 0), 18),
  } : {}

  return (
    <div className={cx('container')}>
      {/* TODO-2: Date 입력 시 커서 컨트롤 */}
      <ReactDatePicker
        {...restProps}
        {...dateRestrictions}
        selected={date}
        onChange={handleChange}
        dateFormat='yyyy/MM/dd HH:mm'
        locale={ko}
        disabled={disabled}
        customInput={(
          <TextField
            ref={ref}
            error={error}
            helperText={helperText}
            disabled={disabled}
            value={value}
            leftIcon={<Icon name='calendar' width={18} height={18} />}
          />
        )}
      />
    </div>
  )
})

DatePicker.displayName = 'DatePicker'

export default DatePicker
