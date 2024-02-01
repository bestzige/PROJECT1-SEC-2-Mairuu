import { useLocalStorage } from '@/composables/useLocalStorage'

export function useMatchHistory() {
  const { data: matchHistory, setData: setMatchHistory } = useLocalStorage('match.history', [])

  const addMatch = match => {
    const updatedHistory = [
      ...matchHistory.value,
      { id: Date.now(), createdAt: new Date().toLocaleString(), ...match },
    ]
    setMatchHistory(updatedHistory)
  }

  const removeMatch = matchId => {
    const updatedHistory = matchHistory.value.filter(match => match.id !== matchId)
    setMatchHistory(updatedHistory)
  }

  const clearMatchHistory = () => {
    setMatchHistory([])
  }

  return { matchHistory, addMatch, removeMatch, clearMatchHistory }
}
