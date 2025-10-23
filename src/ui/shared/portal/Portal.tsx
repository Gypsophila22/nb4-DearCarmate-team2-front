import { PropsWithChildren, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

type PortalProps = {
  selector?: string
}

export const Portal = ({ children, selector }: PropsWithChildren<PortalProps>) => {
  const [mountNode, setMountNode] = useState<null | Element>(null)

  useEffect(() => {
    if (selector) {
      const element = document.querySelector(selector)
      if (element) setMountNode(element)
    } else {
      setMountNode(document.body)
    }
  }, [selector])

  return mountNode ? createPortal(children, mountNode) : null
}
