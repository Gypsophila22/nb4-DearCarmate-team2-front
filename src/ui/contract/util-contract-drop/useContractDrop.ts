import { ContractStatus } from '@shared/types'
import { useRef } from 'react'
import { useDrop } from 'react-dnd'

const useContractDrop = (status: ContractStatus) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'CARD',
    drop: () => ({ name: status }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }))

  const dropRef = useRef(null)
  drop(dropRef)

  return { dropRef, isOver }
}

export default useContractDrop
