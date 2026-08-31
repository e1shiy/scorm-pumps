type CompletionStatus = {
  key: 'cmi.completion_status'
  value: 'completed' | 'incomplete' | 'not attempted' | 'unknown'
}
type SuccessStatus = {
  key: 'cmi.success_status'
  value: 'passed' | 'failed' | 'unknown'
}
type ScoreScaled = {
  key: 'cmi.score.scaled'
  value: number // -1..1
}
type ScoreRaw = {
  key: 'cmi.score.raw'
  value: number
}
type ScoreMax = {
  key: 'cmi.score.max'
  value: number
}
type Location = {
  key: 'cmi.location'
  value: string // max: 1000
}
type Exit = {
  key: 'cmi.exit'
  value: 'timeout' | 'suspend' | 'logout' | 'normal' | '' // suspend=save, ""=reset
}
type Entry = {
  key: 'cmi.entry' // read-only
  value: 'ab-initio' | 'resume' | ''
}
type ProgressMeasure = {
  key: 'cmi.progress_measure'
  value: number // 0..1
}
type ScaledPassingScore = {
  key: 'cmi.scaled_passing_score' // read-only
  value: number // -1..1
}
type InteractionsCount = {
  key: 'cmi.interactions._count ' // read-only
  value: number
}

type CMIElement =
  | CompletionStatus
  | SuccessStatus
  | ScoreScaled
  | ScoreRaw
  | ScoreMax
  | Location
  | Exit
  | Entry
  | ProgressMeasure
  | ScaledPassingScore
  | InteractionsCount

type CMIInteraction = {
  id: string
  type: 'choice' | 'performance'
  weighting: number
  result: 'correct' | 'incorrect' | 'unanticipated' | 'neutral'
  description: string // max: 250
}

type CMIErrorCode = number

export type SCORM_API = {
  Initialize: (value: '') => 'true' | 'false'
  Terminate: (value: '') => 'true' | 'false'
  Commit: (value: '') => 'true' | 'false'
  GetValue: (element: CMIElement['key']) => string
  SetValue: (element: CMIElement['key'], value: CMIElement['value']) => string
  GetLastError: () => CMIErrorCode
  GetErrorString: (errorCode: CMIErrorCode) => string
  GetDiagnostic: (errorCode: CMIErrorCode) => string // Returns detailed information about the prior error that can be useful in diagnosing the problem.
}

export type WindowSCORM = Window & {
  API_1484_11?: SCORM_API
}

export function buildInteractionElements(index: number, interaction: CMIInteraction): CMIElement[] {
  const arr: CMIElement[] = []
  Object.entries(interaction).forEach(([k, v]) => arr.push({ key: `cmi.interactions.${index}.${k}`, value: v } as unknown as CMIElement))
  return arr
}