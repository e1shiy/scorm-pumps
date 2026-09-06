import CloseIcon from '../assets/icons/x.svg?react'
import { Button } from '../components/Button'
import { Modal } from '../components/Modal'
import { useProcedureStore } from '../procedure/useProcedureStore'

interface RotateShaftModalProps {
  isOpened: boolean
  onOpen?: () => void
  onClose?: () => void
}

export function RotateShaftModal({ isOpened, onClose }: RotateShaftModalProps) {
  const submitAction = useProcedureStore(s => s.submitAction)
  const handleClockwise = () => {
    onClose?.()
    submitAction('rotate-shaft-clockwise')
  }
  const handleCounterclockwise = () => {
    onClose?.()
    submitAction('rotate-shaft-counterclockwise')
  }

  return (
    <Modal isOpened={isOpened} onClose={onClose}>
      <div className='flex gap-1.25 justify-between items-center'>
        <p className='text-blue text-[16px]'>Выбрать действие</p>
        <Button className='w-7.5 h-7.5 p-0.5' variant='light-borderless'>
          <CloseIcon className='w-full h-full' onClick={onClose} />
        </Button>
      </div>
      <p className='font-normal text-dark/60 text-center'>Вращение вала</p>
      <span className='w-full h-px bg-blue' />
      <div className='flex flex-col gap-1.5 justify-center'>
        <Button onClick={handleClockwise}>Повернуть по часовой стрелке</Button>
        <Button onClick={handleCounterclockwise}>Повернуть против часовой стрелки</Button>
      </div>
    </Modal>
  )
}
