import { createContext, useContext, useState, type ReactNode } from 'react'

export type ChapterId = 1 | 2 | 3 | 4 | 5
export type PillarId = 'communicate' | 'confidence' | 'lead'
export type TransformStage = 1 | 2 | 3

export interface RobotState {
  chapter: ChapterId
  activePillar: PillarId | null
  transformStage: TransformStage
  showBubble: boolean
}

export interface RobotContextValue {
  state: RobotState
  setChapter: (c: ChapterId) => void
  setPillar: (p: PillarId | null) => void
  setStage: (s: TransformStage) => void
  setShowBubble: (b: boolean) => void
}

const defaultState: RobotState = {
  chapter: 1,
  activePillar: null,
  transformStage: 1,
  showBubble: false,
}

const RobotContext = createContext<RobotContextValue>({
  state: defaultState,
  setChapter: () => {},
  setPillar: () => {},
  setStage: () => {},
  setShowBubble: () => {},
})

export function RobotProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<RobotState>(defaultState)

  const setChapter = (chapter: ChapterId) => {
    setState((prev) => (prev.chapter === chapter ? prev : { ...prev, chapter }))
  }

  const setPillar = (activePillar: PillarId | null) => {
    setState((prev) => (prev.activePillar === activePillar ? prev : { ...prev, activePillar }))
  }

  const setStage = (transformStage: TransformStage) => {
    setState((prev) => (prev.transformStage === transformStage ? prev : { ...prev, transformStage }))
  }

  const setShowBubble = (showBubble: boolean) => {
    setState((prev) => (prev.showBubble === showBubble ? prev : { ...prev, showBubble }))
  }

  return (
    <RobotContext.Provider value={{ state, setChapter, setPillar, setStage, setShowBubble }}>
      {children}
    </RobotContext.Provider>
  )
}

export function useRobot() {
  return useContext(RobotContext)
}
