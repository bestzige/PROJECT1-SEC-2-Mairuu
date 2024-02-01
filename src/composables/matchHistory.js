import mockupHistory from '@/data/mockupHistory.json'

export function matchHistory() {
  const rowBg = gameStatus => {
    return gameStatus === 'win' ? 'text-emerald-400' : 'text-rose-600'
  }
  return { mockupHistory, rowBg }
}
