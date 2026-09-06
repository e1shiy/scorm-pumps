export type ActionId =
  | 'fully-open-water-supply-valve'
  | 'slightly-open-water-supply-valve'
  | 'open-shut-off-valves'
  | 'start-electric-motor'
  | 'visual-inspection'
  | 'rotate-shaft-clockwise'
  | 'rotate-shaft-counterclockwise'

export type ActionConfig = {
  title: string
  description?: string
  toast?: string
}

export type Step = {
  id: string
  expectedActionId: ActionId
}

export type HistoryEntry = {
  id: string
  meta: ActionConfig
  scoreDelta: number
  isSuccess: boolean
}
