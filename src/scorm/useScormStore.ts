import { create } from 'zustand'
import type { CompletionStatus, SCORM_API, SuccessStatus } from './types'
import { getAPI } from './api'

type ScormState = {
  api: SCORM_API | null

  isInitialized: boolean
  completionStatus: CompletionStatus
  successStatus: SuccessStatus
  scaledPassingScore: number
  scoreRaw: number
  scoreMin: number
  scoreMax: number

  initialize: () => void
  finish: () => void
  commit: () => void

  setCompletionStatus: (status: CompletionStatus) => void
  setSuccessStatus: (status: SuccessStatus) => void
  setScoreRaw: (score: number) => void
}

export const useScormStore = create<ScormState>((set, get) => ({
  api: null,
  isInitialized: false,
  completionStatus: 'unknown',
  successStatus: 'unknown',
  scaledPassingScore: 0,
  scoreRaw: 100,
  scoreMin: 0,
  scoreMax: 100,
  initialize: () => {
    if (get().isInitialized) return
    const api = getAPI(window)
    const result = api.Initialize('')
    if (result === 'false') throw new Error("Couldn't initialize SCORM API")

    const passingScore = api.GetValue('cmi.scaled_passing_score')
    if (!passingScore) console.warn("Couldn't get scaled_passing_score value, set to 0")
    const scaledPassingScore = passingScore ? parseFloat(passingScore) : 0

    const { scoreMin, scoreMax } = get()
    if (api.SetValue('cmi.score.min', scoreMin) === 'false') console.warn("Couldn't set score.min after initialization")
    if (api.SetValue('cmi.score.max', scoreMax) === 'false') console.warn("Couldn't set score.max after initialization")

    set({ api, isInitialized: true, scaledPassingScore })
  },
  finish: () => {
    const { api } = get()
    if (!api) return
    if (api.Commit('') === 'false') throw new Error('An error happened while trying to commit')
    if (api.Terminate('') === 'false') throw new Error('An error happened while trying to terminate')
  },
  commit: () => {
    const { api } = get()
    if (!api) throw new Error("Couldn't commit: no api")
    if (api.Commit('') === 'false') throw new Error('An error happened while trying to commit')
  },
  setCompletionStatus: status => {
    const { api } = get()
    if (!api) throw new Error("Couldn't set completionStatus: no api")
    if (api.SetValue('cmi.completion_status', status) === 'false') throw new Error('An error happened while trying to set completionStatus')
    set({ completionStatus: status })
  },
  setSuccessStatus: status => {
    const { api } = get()
    if (!api) throw new Error("Couldn't set successStatus: no api")
    if (api.SetValue('cmi.success_status', status) === 'false') throw new Error('An error happened while trying to set successStatus')
    set({ successStatus: status })
  },
  setScoreRaw: score => {
    const { api } = get()
    if (!api) throw new Error("Couldn't set score: no api")
    if (api.SetValue('cmi.score.raw', score) === 'false') throw new Error('An error happened while trying to set score.raw')
    set({ scoreRaw: score })
  }
}))
