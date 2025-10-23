import classNames from 'classnames/bind'
import styles from './RadioGroup.module.scss'
import Radio from './Radio'

const cx = classNames.bind(styles)

type RadioGroupProps<V> = {
  direction?: 'vertical' | 'horizontal'
  value: V
  onChange: (value: V) => void
  options: {
    value: V
    label: string
  }[]
}

const RadioGroup = <V extends string>({ direction = 'horizontal', onChange, value, options }: RadioGroupProps<V>) => {
  return (
    <div className={cx('container', { vetical: direction === 'vertical' })}>
      {options.map((option) => (
        <Radio
          key={option.value}
          label={option.label}
          selected={value === option.value}
          onClick={() => onChange(option.value)}
        />
      ))}
    </div>
  )
}

export default RadioGroup
