import { Control, Controller, ControllerProps, FieldPath, FieldPathValue, FieldValues } from 'react-hook-form'
import DatePicker, { DatePickerProps } from '../input/DatePicker/DatePicker'

type DatePickerConnectProps<
  F extends FieldValues,
  N extends FieldPath<F>
> = Omit<DatePickerProps, 'value' | 'error' | 'onChange' | 'helperText'> & {
  name: N
  control?: Control<F>
  defaultValue?: FieldPathValue<F, N>
  rules?: ControllerProps<F, N>['rules']
  restrictToFuture?: boolean
}

const DatePickerConnect = <
  F extends FieldValues,
  N extends FieldPath<F>
>({
  name,
  control,
  defaultValue,
  rules,
  restrictToFuture,
  ...datePickerProps
}: DatePickerConnectProps<F, N>) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={rules}
      render={({ field, fieldState }) => (
        <DatePicker
          {...field}
          {...datePickerProps}
          restrictToFuture={restrictToFuture}
          error={Boolean(fieldState.error)}
          helperText={fieldState.error?.message}
          onChange={(date) => field.onChange(date)}
        />
      )}
    />
  )
}

export default DatePickerConnect
