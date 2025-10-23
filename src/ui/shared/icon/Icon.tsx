import classNames from 'classnames/bind'
import styles from './Icon.module.scss'
import Image from 'next/image'
import { IconName } from './types'
import { ICON_ALT_MAP } from './constants'

const cx = classNames.bind(styles)

type IconProps = {
  name: IconName
  width: number
  height: number
  alt?: string
  rotate?: 0 | 45 | 90 | 180 | 270 | 360
  priority?: boolean
  className?: string
  onClick?: () => void
}

const Icon = ({
  name,
  width,
  height,
  alt,
  rotate = 0,
  priority = false,
  onClick,
  className,
}: IconProps) => {
  return (
    <Image
      src={`/icons/${name}.svg`}
      width={width}
      height={height}
      alt={alt || ICON_ALT_MAP[name]}
      className={cx(
        'container',
        `rotate-${rotate}`,
        className,
      )}
      priority={priority}
      onClick={onClick}
    />
  )
}

export default Icon
