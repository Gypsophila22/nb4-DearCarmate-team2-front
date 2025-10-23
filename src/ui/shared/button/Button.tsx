import classNames from 'classnames/bind'
import styles from './Button.module.scss'

const cx = classNames.bind(styles)

type ButtonProps = {
  children: React.ReactNode
  size: 'small' | 'large'
  theme: 'red' | 'gray' | 'outline'
} & React.ComponentPropsWithoutRef<'button'>

const Button = ({
  children,
  size,
  theme,
  className,
  ...buttonProps
}: ButtonProps) => {
  return (
    <button
      className={cx('container', size, theme, className)}
      type='button'
      {...buttonProps}
    >
      {children}
    </button>
  )
}

export default Button
