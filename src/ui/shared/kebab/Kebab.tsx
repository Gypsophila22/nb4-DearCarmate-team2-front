import classNames from 'classnames/bind'
import styles from './Kebab.module.scss'
import Icon from '../icon/Icon'
import usePopover from '../dropdown/usePopover'
import { useMemo, useRef } from 'react'
import PopoverMenus from '../popover-menus/PopoverMenus'

const cx = classNames.bind(styles)

type KebabProps<R extends object = any> = {
  menus: {
    text: React.ReactNode
    checkVisible?: boolean | ((record: R) => boolean)
    onClick: (record: R) => void
  }[]
  record?: R
}

const Kebab = ({ menus, record }: KebabProps) => {
  const triggerRef = useRef<HTMLButtonElement>(null)
  const { closePopover, popoverRef, togglePopover } = usePopover(triggerRef)

  const items = useMemo(
    () => menus
      .filter(({ checkVisible }) => {
        if (typeof checkVisible === 'function') {
          return checkVisible(record)
        }
        return checkVisible ?? true
      })
      .map((menu) => ({
        text: menu.text,
        onClick: (event: React.MouseEvent) => {
          event.preventDefault()
          event.stopPropagation()
          closePopover()
          menu.onClick(record)
        },
      })),
    [closePopover, menus, record],
  )

  return (
    <div className={cx('container')}>
      <button
        type='button'
        onClick={(e) => {
          e.preventDefault()
          togglePopover()
        }}
        ref={triggerRef}
      >
        <Icon name='more' width={24} height={24} />
      </button>
      <div className={cx('popoverWrapper')}>
        <PopoverMenus
          ref={popoverRef}
          items={items}
        />
      </div>
    </div>
  )
}

export default Kebab
