import { Control, Controller, ControllerProps, FieldPath, FieldPathValue, FieldValues } from 'react-hook-form'
import RadioGroup from '../input/RadioGroup/RadioGroup'

type RadioConnectProps<
  F extends FieldValues,
  N extends FieldPath<F>
> = {
  name: N
  control?: Control<F>
  defaultValue?: FieldPathValue<F, N>
  rules?: ControllerProps<F, N>['rules']
  direction?: 'horizontal' | 'vertical'
  options: {
    value: FieldPathValue<F, N>
    label: string
  }[]
}

const RadioConnect = <F extends FieldValues, N extends FieldPath<F>>({
  name,
  control,
  defaultValue,
  rules,
  direction,
  options,
}: RadioConnectProps<F, N>) => {

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue ?? options[0]?.value}
      rules={rules}
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      render={({ field: { ref, ...field } }) => (
        <RadioGroup
          {...field}
          options={options}
          direction={direction}
        />
      )}
    />
  )
}

export default RadioConnect
