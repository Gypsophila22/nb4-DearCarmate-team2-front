import classNames from 'classnames/bind'
import styles from './BoardGroup.module.scss'
import { ContractStatus, ContractType } from '@shared/types'
import { CONTRACT_STATUS_MAP } from '@ui/shared/util-constants/constants'
import ContractCard from '../ui-contract-card/ContractCard'
import useContractDrop from '../util-contract-drop/useContractDrop'
const cx = classNames.bind(styles)

type BoardGroupProps = {
  status: ContractStatus
  cards: ContractType[]
  totalItemCount: number
}

const BoardGroup = ({ cards, status, totalItemCount }: BoardGroupProps) => {
  const { dropRef, isOver } = useContractDrop(status)

  return (
    <div ref={dropRef} className={cx('container')}>
      <h2 className={cx('title')}>
        {CONTRACT_STATUS_MAP[status]}
        <span className={cx('totalItemCount')}>({totalItemCount})</span>
      </h2>
      <div className={cx('body')}>
        <div className={cx('cardsContainer')}>
          {cards.map((card) => (
            <ContractCard key={card.id} data={card} />
          ))}
        </div>
        <div className={cx('dropIndicator', { isOver })} />
      </div>
    </div>
  )
}

export default BoardGroup
