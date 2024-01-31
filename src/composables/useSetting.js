import { useLocalStorage } from '@/composables/useLocalStorage'
import cursors from '@/data/cursors.json'
import themes from '@/data/themes.json'

export function useSetting() {
  const { data: sound, setData: setSound } = useLocalStorage('settings.sound', true)
  const { data: theme, setData: setTheme } = useLocalStorage('settings.theme', themes[0])
  const { data: cursor, setData: setCursor } = useLocalStorage('settings.cursor', cursors[0])

  const toggleSound = () => {
    setSound(!sound.value)
  }

  return { themes, theme, setTheme, cursors, cursor, setCursor, sound, toggleSound }
}
