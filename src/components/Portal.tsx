'use client'

import { useEffect, useState, ReactNode } from 'react'
import { createPortal } from 'react-dom'

const Portal = ({ children }: { children: ReactNode }) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  if (!mounted) {
    return null
  }

  const container = document.getElementById('modal-root')
  if (!container) {
    return null
  }

  return createPortal(children, container)
}

export default Portal