import classNames from 'classnames/bind'
import styles from './TextField.module.scss'
import { forwardRef } from 'react'
import Hint from '../Hint/Hint'

const cx = classNames.bind(styles)

export type TextFieldProps = {
  height?: string
  error?: boolean
  helperText?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  className?: string
} & React.ComponentPropsWithoutRef<'input'>

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(({
  height,
  error = false,
  helperText,
  leftIcon,
  rightIcon,
  className,
  ...inputProps
}, ref) => {
  return (
    <div className={cx('container')}>
      <div
        className={cx('wrapper')}
        style={{ height }}
      >
        {leftIcon && leftIcon}
        <input
          ref={ref}
          className={cx('input', className, { error })}
          {...inputProps}
        />
        {rightIcon && rightIcon}
      </div>
      {helperText && (<Hint message={helperText} />)}
    </div>
  )
})

TextField.displayName = 'TextField'

export default TextField
