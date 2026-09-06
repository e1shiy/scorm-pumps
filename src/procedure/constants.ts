import type { ActionConfig, ActionId } from "./types";

export const ACTIONS: Record<ActionId, ActionConfig> = {
  'fully-open-water-supply-valve': {
    title: 'Вентиль подачи свежей воды',
    description: 'Открыть'
  },
  'slightly-open-water-supply-valve': {
    title: 'Вентиль подачи свежей воды',
    description: 'Приоткрыть'
  },
  'open-shut-off-valves': {
    title: 'Запорная арматура на всасе и нагнетании',
    description: 'Открыть'
  },
  'start-electric-motor': {
    title: 'Пуск электродвигателя',
    description: 'Запустить'
  },
  'visual-inspection': {
    title: 'Визуальный осмотр',
    toast:
      'Проверка фланцевых соединений, наличие кожухов на фланцевых соединениях выполнена, насос проверен, масло в картере в норме, заземление в норме'
  },
  'rotate-shaft-clockwise': {
    title: 'Вращение вала',
    description: 'Повернуть по часовой стрелке'
  },
  'rotate-shaft-counterclockwise': {
    title: 'Вращение вала',
    description: 'Повернуть против часовой стрелки'
  }
}

type Step = {
  id: string
  expectedActionId: ActionId
}

export const STEPS: Step[] = [
  { id: '1', expectedActionId: 'visual-inspection' },
  { id: '2', expectedActionId: 'open-shut-off-valves' },
  { id: '3', expectedActionId: 'slightly-open-water-supply-valve' },
  { id: '4', expectedActionId: 'start-electric-motor' },
  { id: '5', expectedActionId: 'rotate-shaft-counterclockwise' },
  { id: '6', expectedActionId: 'fully-open-water-supply-valve' }
]
