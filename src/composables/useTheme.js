import { useLocalStorage } from '@/composables/useLocalStorage'
import themes from '@/data/themes.json'

export function useTheme() {
  const { data: theme, setData: setTheme } = useLocalStorage('settings.theme', themes[0])

  return { themes, theme, setTheme }
}
