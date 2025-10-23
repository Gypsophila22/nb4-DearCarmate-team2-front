import classNames from 'classnames/bind'
import styles from './ContractsBoard.module.scss'
import useContracts from '../data-access-contracts/useContracts'
import { ContractStatus, SearchByContract } from '@shared/types'
import BoardGroup from './BoardGroup'
import CollabsibleBoardGroup from './CollabsibleBoardGroup/CollabsibleBoardGroup'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { ContractContextProvider } from '../util-contract-context/ContractContext'
import Loader from '@ui/shared/loader/Loader'

const cx = classNames.bind(styles)

type ContractsBoardProps = {
  searchBy: SearchByContract
  keyword: string
}

const ContractsBoard = ({ keyword, searchBy }: ContractsBoardProps) => {
  const { data: contractsData, isLoading } = useContracts({ searchBy, keyword })
  if (isLoading || !contractsData) return (
    <div className={cx('loading')}>
      <Loader />
    </div>
  )

  const { carInspection, priceNegotiation, contractDraft, contractFailed, contractSuccessful } = contractsData
  return (
    <ContractContextProvider searchBy={searchBy} keyword={keyword}>
      <DndProvider backend={HTML5Backend}>
        <div className={cx('container')}>
          <BoardGroup
            status={ContractStatus.carInspection}
            cards={carInspection.data}
            totalItemCount={carInspection.totalItemCount}
          />
          <BoardGroup
            status={ContractStatus.priceNegotiation}
            cards={priceNegotiation.data}
            totalItemCount={priceNegotiation.totalItemCount}
          />
          <BoardGroup
            status={ContractStatus.contractDraft}
            cards={contractDraft.data}
            totalItemCount={contractDraft.totalItemCount}
          />
          <div className={cx('collabsibleGroupWrapper')}>
            <CollabsibleBoardGroup
              status={ContractStatus.contractSuccessful}
              cards={contractSuccessful.data}
              totalItemCount={contractSuccessful.totalItemCount}
            />
          </div>
          <div className={cx('collabsibleGroupWrapper')}>
            <CollabsibleBoardGroup
              status={ContractStatus.contractFailed}
              cards={contractFailed.data}
              totalItemCount={contractFailed.totalItemCount}
            />
          </div>
        </div>
      </DndProvider>
    </ContractContextProvider>
  )
}

export default ContractsBoard
