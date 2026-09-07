import { Button } from '../components/Button'
import ScaleUpIcon from '../assets/icons/scale-up.svg?react'
import ScaleDownIcon from '../assets/icons/scale-down.svg?react'
import ScaleResetIcon from '../assets/icons/scale-reset.svg?react'
import FullscreenIcon from '../assets/icons/fullscreen.svg?react'
import FullscreenAltIcon from '../assets/icons/fullscreen-alt.svg?react'
import PumpArtwork from '../assets/pump.svg?react'
import { useProcedureStore } from '../procedure/useProcedureStore'
import { useCallback, useEffect, useRef, useState } from 'react'
import { RotateShaftModal } from '../modals/RotateShaftModal'
import { usePan } from '../usePan'

const buttonStyles =
  'w-full h-full font-medium flex-center text-center text-[8px] px-0.25 leading-tight text-dark bg-light-gray hover:bg-gray border border-black rounded-[2px] shadow-sm cursor-pointer'

export function EquipmentDiagram() {
  const submitAction = useProcedureStore(s => s.submitAction)
  const currentStepIndex = useProcedureStore(s => s.currentStepIndex)

  const diagramRef = useRef<HTMLDivElement>(null)
  const { handlePointerDown, handlePointerMove, handlePointerUp } = usePan(diagramRef)

  const [scale, setScale] = useState(1)
  const upScale = () => setScale(s => Math.min(s + 0.25, 10))
  const downScale = () => setScale(s => Math.max(s - 0.25, 1))

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault()
    if (e.deltaY < 0) upScale()
    else downScale()
  }

  const [isFullscreen, setIsFullscreen] = useState(false)

  const toggleFullscreen = useCallback(async () => {
    const element = diagramRef.current
    if (!element) return

    try {
      if (!document.fullscreenElement) {
        await element.requestFullscreen()
        setIsFullscreen(true)
      } else {
        await document.exitFullscreen()
        setIsFullscreen(false)
      }
    } catch (error) {
      console.error('Error toggling fullscreen:', error)
    }
  }, [])

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
    }
  }, [])

  const [isShaftModalOpen, setIsShaftModalOpen] = useState(false)

  const isShutoffValveOpen = currentStepIndex >= 2
  const handleShaftClick = () => {
    if (currentStepIndex < 4) {
      submitAction('rotate-shaft-clockwise')
    } else if (currentStepIndex === 4) {
      setIsShaftModalOpen(true)
    }
  }

  const waterSpeed = currentStepIndex < 3 ? 0 : currentStepIndex < 6 ? 3.5 : 15
  const waterMarkerColor = currentStepIndex < 3 ? 'fill-red' : currentStepIndex < 6 ? 'fill-yellow' : 'fill-green'
  const handleWaterValveClick = () => {
    if (currentStepIndex < 3) {
      return submitAction('slightly-open-water-supply-valve')
    } else {
      return submitAction('fully-open-water-supply-valve')
    }
  }

  return (
    <div
      className={'grow relative bg-light rounded-st overflow-auto scrollbar-none w-full h-full cursor-grab select-none'}
      ref={diagramRef}
      onWheel={handleWheel}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      <div className='sticky top-2.5 left-2.5 flex flex-col gap-2.5 z-2 w-max'>
        <Button onClick={upScale} className='w-8 h-8'>
          <ScaleUpIcon className='w-full h-full' />
        </Button>
        <Button onClick={downScale} className='w-8 h-8'>
          <ScaleDownIcon className='w-full h-full' />
        </Button>
        <Button onClick={() => setScale(1)} className='w-8 h-8'>
          <ScaleResetIcon className='w-full h-full' />
        </Button>
        <Button onClick={toggleFullscreen} className='w-8 h-8'>
          {isFullscreen ? <FullscreenAltIcon className='w-full h-full' /> : <FullscreenIcon className='w-full h-full' />}
        </Button>
      </div>

      <div>
        <svg
          viewBox='0 0 558 441'
          className='w-full h-full p-4 absolute top-0 left-0'
          style={{ scale: scale, transformOrigin: 'top left' }}
        >
          <PumpArtwork />
          <g>
            <foreignObject x={0.5} y={201.5} width={103} height={25}>
              <button onClick={() => submitAction('open-shut-off-valves')} className={buttonStyles}>
                Запорная арматура на всасе и нагнетании
              </button>
            </foreignObject>
            <rect x={106.5} y={211.5} width={5} height={5} className={isShutoffValveOpen ? 'fill-green' : 'fill-red'} stroke='black' />
          </g>
          <g>
            <foreignObject x={484.5} y={176.5} width={73} height={13}>
              <button onClick={handleShaftClick} className={buttonStyles}>
                Вращение вала
              </button>
            </foreignObject>
          </g>
          <g>
            <foreignObject x={381.5} y={427.5} width={135} height={13}>
              <button onClick={handleWaterValveClick} className={buttonStyles}>
                Вентиль подачи свежей воды
              </button>
            </foreignObject>
            <rect x={373.5} y={431.5} width={5} height={5} className={waterMarkerColor} stroke='black' />
          </g>

          <foreignObject x={469.5} y={370.5} width={53} height={16}>
            <div className='w-full h-full bg-gray-200 border border-black flex items-center justify-between px-1 text-[8px]'>
              <span className='text-black font-medium'>м³/ч</span>
              <span className='bg-white border text-black font-medium border-black w-5.25 h-3 flex items-center justify-center'>
                {waterSpeed}
              </span>
            </div>
          </foreignObject>
        </svg>
      </div>

      <RotateShaftModal isOpened={isShaftModalOpen} onClose={() => setIsShaftModalOpen(false)} />
    </div>
  )
}
