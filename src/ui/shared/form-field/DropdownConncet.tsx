import { Controller, ControllerProps, useFormContext } from 'react-hook-form'
import Dropdown, { DropdownProps } from '@ui/shared/dropdown/Dropdown'
import Hint from '@ui/shared/input/Hint/Hint'

type DropdownConncetProps = {
  name: string
  rules?: ControllerProps['rules']
} & Omit<DropdownProps<string | number>, 'type' | 'onSelect' | 'currentData'>

const DropdownConncet = ({ name, rules, ...dropdownProps }: DropdownConncetProps) => {
  const { setValue } = useFormContext()

  return (
    <Controller
      name={name}
      rules={rules}
      render={({ field: { value }, fieldState: { error } }) => (
        <div>
          <Dropdown
            type='modal'
            onSelect={(data) => { setValue(name, data) }}
            currentData={value}
            {...dropdownProps}
          />
          {error?.message && <Hint message={error.message} />}
        </div>
      )}
    />
  )
}

export default DropdownConncet
