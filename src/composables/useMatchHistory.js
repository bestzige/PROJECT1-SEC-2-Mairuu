import { useLocalStorage } from '@/composables/useLocalStorage'

// #TODO: fix history for no related data when game end
export function useMatchHistory() {
  const {
    data: matchHistory,
    setData: setMatchHistory,
    reloadData: reloadMatchHistory,
  } = useLocalStorage('match.history', [])

  const addMatch = match => {
    const updatedHistory = [
      { id: Date.now(), createdAt: new Date().toLocaleString(), ...match },
      ...matchHistory.value,
    ]
    setMatchHistory(updatedHistory)
  }

  const removeMatch = matchId => {
    const updatedHistory = matchHistory.value.filter(match => match.id !== matchId)
    setMatchHistory(updatedHistory)
  }

  const clearMatchHistory = () => {
    setMatchHistory([])
    window.location.reload()
  }

  return { matchHistory, addMatch, removeMatch, clearMatchHistory, reloadMatchHistory }
}
