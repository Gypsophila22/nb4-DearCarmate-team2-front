import classNames from 'classnames/bind'
import styles from './PopoverMenus.module.scss'
import { forwardRef, useState } from 'react'
import TextField from '../input/TextField/TextField'
import Icon from '../icon/Icon'
import debounce from 'debounce'

const cx = classNames.bind(styles)

type PopoverMenusProps = {
  items: {
    text: React.ReactNode
    onClick: React.MouseEventHandler
  }[]
  hasSearch?: boolean
  searchInputPlaceholder?: string
}

const PopoverMenus = forwardRef<HTMLDialogElement, PopoverMenusProps>(({ items, hasSearch = false, searchInputPlaceholder }, ref) => {
  const [searchKeyword, setSearchKeyword] = useState('')
  const searchItems = hasSearch ? items.filter(({ text }) => text?.toString().includes(searchKeyword)) : items

  return (
    <dialog className={cx('popup', { hasSearch })} ref={ref}>
      {hasSearch && (
        <div className={cx('searchInputWrapper')}>
          <TextField
            placeholder={searchInputPlaceholder}
            height='40px'
            rightIcon={<Icon name='search' width={24} height={24} />}
            className='dropdownInput'
            onChange={debounce((e) => { setSearchKeyword(e.target.value) }, 300)}
          />
        </div>
      )}
      <div className={cx('selectMenu')}>
        {searchItems.map(({ text, onClick }, idx) => {
          return (
            <button className={cx('item')} type='button' onClick={onClick} key={`${text}-${idx}`}>
              <p className={cx('text')}>{text}</p>
            </button>
          )
        })}
        {hasSearch && searchItems.length === 0 && (
          <div className={cx('emptySearch')}>검색 결과가 없습니다.</div>
        )}
      </div>
    </dialog>
  )
})

PopoverMenus.displayName = 'PopoverMenus'

export default PopoverMenus
