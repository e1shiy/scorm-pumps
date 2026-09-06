import SettingsIcon from '../assets/icons/settings.svg?react'
import ChevronIcon from '../assets/icons/chevron.svg?react'
import { Button } from '../components/Button'
import { useProcedureStore } from '../procedure/useProcedureStore'

export function ActionPanel() {
  const submitAction = useProcedureStore(s => s.submitAction)

  return (
    <div className='w-80 shrink-0 bg-light text-blue rounded-st p-2.5 flex flex-col gap-5'>
      <div className='flex justify-between items-center gap-1.25'>
        <div className='flex gap-2.5 flex-center'>
          <SettingsIcon className='w-4 h-4' />
          <p>Действия по установке</p>
        </div>
        <Button variant='light-borderless' className='w-8 h-8'>
          <ChevronIcon className='w-full h-full rotate-180' />
        </Button>
      </div>
      <div className='flex flex-col gap-2.5'>
        <Button onClick={() => submitAction('visual-inspection')} variant='light'>
          Визуальный осмотр
        </Button>
        <Button onClick={() => submitAction('start-electric-motor')} variant='light'>
          Пуск электродвигателя
        </Button>
      </div>
    </div>
  )
}
