import classNames from 'classnames/bind'
import styles from './ContractListPopover.module.scss'
import { forwardRef, useState } from 'react'
import { ContractStatus, ContractType } from '@shared/types'
import ContractCard from '@ui/contract/ui-contract-card/ContractCard'
import { CONTRACT_STATUS_MAP } from '@ui/shared/util-constants/constants'
import TextField from '@ui/shared/input/TextField/TextField'
import debounce from 'debounce'
import Icon from '@ui/shared/icon/Icon'

const cx = classNames.bind(styles)

type ContractListPopoverProps = {
  status: ContractStatus.contractSuccessful | ContractStatus.contractFailed
  cards: ContractType[]
  totalItemCount: number
}

const ContractListPopover = forwardRef<HTMLDialogElement, ContractListPopoverProps>(({ cards, status, totalItemCount }, ref) => {
  const [searchKeyword, setSearchKeyword] = useState('')
  const searchCards = cards.filter(card =>
    card.user.name.includes(searchKeyword) ||
    card.car.model.includes(searchKeyword) ||
    card.customer.name.includes(searchKeyword))

  return (
    <dialog ref={ref} className={cx('popover')}>
      <div className={cx('contentContainer')}>
        <div className={cx('title')}>{`${CONTRACT_STATUS_MAP[status]} (${totalItemCount})`}</div>
        <TextField
          placeholder='Search'
          height='40px'
          rightIcon={<Icon name='search' width={24} height={24} />}
          className='dropdownInput'
          onChange={debounce((e) => { setSearchKeyword(e.target.value) }, 300)}
        />
        {searchCards.length > 0 && (
          <div className={cx('cardsWrapper')}>
            {searchCards.map((card) => (
              <ContractCard key={card.id} data={card} />
            ))}
          </div>
        )}
        {searchCards.length === 0 && (
          <div className={cx('empty')}>
            {searchKeyword ? '검색 결과가 없습니다.' : '아직 계약 건이 없습니다.'}
          </div>
        )}
      </div>
    </dialog>
  )
})

ContractListPopover.displayName = 'ContractListPopover'

export default ContractListPopover
