import { useEffect, useMemo } from 'react'
import { createPortal } from 'react-dom'

interface ModalProps {
  isOpened: boolean
  children?: React.ReactNode
  onOpen?: () => void
  onClose?: () => void
}

export function Modal({ children, isOpened, onClose, onOpen }: ModalProps) {
  useEffect(() => {
    onOpen?.()
    const handleEsc = (e: KeyboardEvent) => e.code === 'Escape' && onClose?.()
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [onOpen, onClose])

  const modalRootElement = useMemo(() => document.getElementById('modal-root'), [])
  if (!modalRootElement) {
    console.error('#modal-root not found')
    return null
  }

  return createPortal(
    isOpened && (
      <div className={'fixed inset-0 flex-center w-screen h-dvh bg-dark/60 z-1000'} role={'dialog'} aria-modal={'true'}>
        <button
          type='button'
          onClick={onClose}
          aria-label='Close modal'
          className='absolute inset-0 w-full h-full cursor-default border-none bg-transparent p-0'
        />
        <div className='p-5 rounded-st flex flex-col gap-5 bg-light max-w-100 z-2'>{children}</div>
      </div>
    ),
    modalRootElement
  )
}
