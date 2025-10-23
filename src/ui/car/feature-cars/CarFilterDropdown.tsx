import classNames from 'classnames/bind'
import styles from './CarFilterDropdown.module.scss'
import { useMemo, useRef, useState } from 'react'
import usePopover from '@ui/shared/dropdown/usePopover'
import Icon from '@ui/shared/icon/Icon'
import PopoverMenus from '@ui/shared/popover-menus/PopoverMenus'
import { CAR_STATUS_FILTERS } from '@ui/shared/dropdown/constants'
import { useRouter } from 'next/router'
import { CarStatusParam } from '@shared/types'

const cx = classNames.bind(styles)

type CarFilterDropdownProps = {
  initialStatus: CarStatusParam
}

const CarFilterDropdown = ({ initialStatus }: CarFilterDropdownProps) => {
  const triggerRef = useRef<HTMLButtonElement>(null)
  const { popoverRef, closePopover, togglePopover } = usePopover(triggerRef)
  const [isFiltered, setIsFiltered] = useState(initialStatus !== CarStatusParam.total)
  const router = useRouter()

  const filters = CAR_STATUS_FILTERS
  const items = useMemo(
    () => filters
      .map((filter) => ({
        text: filter.text,
        onClick: (event: React.MouseEvent) => {
          event.stopPropagation()
          setIsFiltered(true)
          router.push(`/cars?status=${filter.data}`)
          closePopover()
        },
      })),
    [closePopover, filters, router],
  )

  return (
    <div className={cx('container')}>
      <button
        type='button'
        onClick={() => {
          if (isFiltered) {
            setIsFiltered(false)
            router.push('/cars')
          } else togglePopover()
        }}
        ref={triggerRef}
        className={cx('trigger', { isFiltered })}
      >
        <Icon name={isFiltered ? 'filter-active' : 'filter-inactive'} width={16} height={16} />
      </button>
      <div className={cx('popoverWrapper')}>
        <PopoverMenus
          items={items}
          ref={popoverRef}
        />
      </div>
    </div>
  )
}

export default CarFilterDropdown
