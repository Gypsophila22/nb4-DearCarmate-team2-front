import classNames from 'classnames/bind'
import styles from './Dropdown.module.scss'
import Icon from '../icon/Icon'
import usePopover from './usePopover'
import { useMemo, useRef } from 'react'
import PopoverMenus from '../popover-menus/PopoverMenus'

const cx = classNames.bind(styles)

export type DropdownProps<T> = {
  type: 'search' | 'modal'
  filters: {
    text: string
    data: T
  }[]
  currentData?: T
  label?: string
  onSelect: (data: T, text: string) => void
  hasSearch?: boolean
  searchInputPlaceholder?: string
}
const Dropdown = <T extends string | number>({
  type,
  label,
  filters,
  currentData,
  onSelect,
  hasSearch = false,
  searchInputPlaceholder,
}: DropdownProps<T>) => {
  const selectedFilter = filters.find((filter) => filter.data === currentData)

  const triggerRef = useRef<HTMLButtonElement>(null)
  const { popoverRef, isOpened, closePopover, togglePopover } = usePopover(triggerRef)

  const items = useMemo(
    () => filters
      .map((filter) => ({
        text: filter.text,
        onClick: (event: React.MouseEvent) => {
          event.stopPropagation()
          onSelect(filter.data, filter.text)
          closePopover()
        },
      })),
    [closePopover, filters, onSelect],
  )

  return (
    <div className={cx('container', type)}>
      <button
        type='button'
        onClick={() => {
          togglePopover()
        }}
        ref={triggerRef}
        className={cx('trigger', { isOpened })}
      >
        <p className={cx('selectedOption', { selected: selectedFilter })}>{selectedFilter?.text ?? label}</p>
        <Icon name='arrow-down' width={24} height={24} alt='드롭다운 화살표' rotate={isOpened ? 180 : 360} className='icon' />
      </button>
      <div className={cx('popoverWrapper', { type })}>
        <PopoverMenus
          items={items}
          hasSearch={hasSearch}
          ref={popoverRef}
          searchInputPlaceholder={searchInputPlaceholder}
        />
      </div>
    </div>
  )
}

export default Dropdown
