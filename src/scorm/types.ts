export type CompletionStatus = 'completed' | 'incomplete' | 'not attempted' | 'unknown'
export type SuccessStatus = 'passed' | 'failed' | 'unknown'
type ScaledPassingScore = number // -1...1
type ScoreRaw = number
type ScoreMin = number
type ScoreMax = number

type CMIElementMap = {
  'cmi.completion_status': CompletionStatus
  'cmi.success_status': SuccessStatus
  'cmi.scaled_passing_score': ScaledPassingScore
  'cmi.score.raw': ScoreRaw
  'cmi.score.min': ScoreMin
  'cmi.score.max': ScoreMax
}

export type SCORM_API = {
  Initialize: (value: '') => 'true' | 'false'
  Terminate: (value: '') => 'true' | 'false'
  Commit: (value: '') => 'true' | 'false'
  GetValue: <K extends keyof CMIElementMap>(element: K) => string
  SetValue: <K extends keyof CMIElementMap>(element: K, value: CMIElementMap[K]) => 'true' | 'false'
}

export type WindowSCORM = Window & {
  API_1484_11?: SCORM_API
}
