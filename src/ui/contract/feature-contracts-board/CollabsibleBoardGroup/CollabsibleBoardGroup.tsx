import classNames from 'classnames/bind'
import styles from './CollabsibleBoardGroup.module.scss'
import { ContractStatus, ContractType } from '@shared/types'
import usePopover from '@ui/shared/dropdown/usePopover'
import Icon from '@ui/shared/icon/Icon'
import { CONTRACT_STATUS_MAP } from '@ui/shared/util-constants/constants'
import ContractListPopover from './ContractListPopover'
import useContractDrop from '@ui/contract/util-contract-drop/useContractDrop'

const cx = classNames.bind(styles)

type CollabsibleBoardGroupProps = {
  status: ContractStatus.contractSuccessful | ContractStatus.contractFailed
  cards: ContractType[]
  totalItemCount: number
}

const CollabsibleBoardGroup = ({ cards, status, totalItemCount }: CollabsibleBoardGroupProps) => {
  const { dropRef, isOver } = useContractDrop(status)

  const { popoverRef, isOpened, togglePopover } = usePopover(dropRef)

  return (
    <div className={cx('container')}>
      <button type='button' onClick={() => togglePopover()} ref={dropRef} className={cx('trigger', { isOpened, isOver })}>
        <Icon name={status === ContractStatus.contractSuccessful ? 'box-blue' : 'box-red'} width={24} height={24} />
        <div className={cx('title')}>{`${CONTRACT_STATUS_MAP[status]} (${totalItemCount})`}</div>
      </button>
      <div className={cx('popoverWrapper')}>
        <ContractListPopover ref={popoverRef} cards={cards} status={status} totalItemCount={totalItemCount} />
      </div>
    </div>
  )
}

export default CollabsibleBoardGroup
