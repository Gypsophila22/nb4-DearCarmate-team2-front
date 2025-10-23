import { Control, Controller, ControllerProps, FieldPath, FieldPathValue, FieldValues, PathValue } from 'react-hook-form'
import { TextFieldProps } from '../input/TextField/TextField'
import PasswordField from '../input/PasswordField/PasswordField'

type PasswordFieldConnectProps<
  F extends FieldValues,
  N extends FieldPath<F>
> = Omit<TextFieldProps, 'type' | 'value' | 'error' | 'onChange' | 'helperText'> & {
  name: N
  control?: Control<F>
  defaultValue?: FieldPathValue<F, N>
  rules?: ControllerProps<F, N>['rules']
}

const PasswordFieldConnect = <
  F extends FieldValues,
  N extends FieldPath<F>
>({
  name,
  control,
  defaultValue,
  rules,
  ...inputProps
}: PasswordFieldConnectProps<F, N>) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={(defaultValue ?? '') as PathValue<F, N>}
      rules={rules}
      render={({ field, fieldState }) => (
        <PasswordField
          {...field}
          {...inputProps}
          error={Boolean(fieldState.error)}
          helperText={fieldState.error?.message}
        />
      )}
    />
  )
}

export default PasswordFieldConnect
