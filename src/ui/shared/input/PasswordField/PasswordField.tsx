import TextField from '../TextField/TextField'
import Icon from '../../icon/Icon'
import { forwardRef, useState } from 'react'

export type PasswordFieldProps = {
  error?: boolean
  height?: string
  helperText?: string
} & React.ComponentPropsWithoutRef<'input'>

const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(({
  error = false,
  helperText,
  ...inputProps
}, ref) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  return (
    <TextField
      ref={ref}
      type={isPasswordVisible ? 'text' : 'password'}
      error={error}
      helperText={helperText}
      {...inputProps}
      rightIcon={(
        <Icon
          name={isPasswordVisible ? 'eye-open' : 'eye-close'}
          width={24}
          height={24}
          className='clickable'
          onClick={() => setIsPasswordVisible(!isPasswordVisible)}
        />
      )}
      placeholder='비밀번호를 입력해주세요'
    />
  )
})

PasswordField.displayName = 'PasswordField'

export default PasswordField
