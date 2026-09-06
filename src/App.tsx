import logoSrc from './assets/logo.png'
import { HistoryPanel } from './widgets/HistoryPanel'
import { useScormStore } from './scorm/useScormStore'
import { ResultsModal } from './modals/ResultsModal'
import { ActionPanel } from './widgets/ActionPanel'
import { ProgressBar } from './widgets/ProgressBar'
import { EquipmentDiagram } from './widgets/EquipmentDiagram'

function App() {
  // const initialize = useScormStore(s => s.initialize)
  // const finish = useScormStore(s => s.finish)
  // useEffect(() => {
  //   initialize()
  //   window.addEventListener('beforeunload', finish)
  //   window.addEventListener('pagehide', finish)
  //   return () => {
  //     window.removeEventListener('beforeunload', finish)
  //     window.removeEventListener('pagehide', finish)
  //   }
  // }, [initialize, finish])

  const isFinished = useScormStore(s => s.isTerminated)

  return (
    <>
      <div className='grow max-h-full flex gap-2.5 p-2.5'>
        <div className='grow flex flex-col gap-2.5'>
          <div className='flex gap-3 h-10'>
            <img className='w-31 h-full' src={logoSrc} alt='ЕвроХим' loading='lazy' />
            <ProgressBar />
          </div>
          <div className='grow flex gap-2.5'>
            <ActionPanel />
            <EquipmentDiagram />
          </div>
        </div>
        <HistoryPanel />
      </div>
      <ResultsModal isOpened={isFinished} />
    </>
  )
}

export default App
