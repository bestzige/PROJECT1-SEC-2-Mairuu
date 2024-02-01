import { useLocalStorage } from '@/composables/useLocalStorage'
import cursors from '@/data/cursors.json'
import targetSizes from '@/data/target-sizes.json'
import themes from '@/data/themes.json'

export function useSetting() {
  const { data: sound, setData: setSound } = useLocalStorage('settings.sound', true)
  const { data: theme, setData: setTheme } = useLocalStorage('settings.theme', themes[0])
  const { data: cursor, setData: setCursor } = useLocalStorage('settings.cursor', cursors[0])
  const { data: targetSize, setData: setTargetSize } = useLocalStorage(
    'settings.targetSize',
    targetSizes[0],
  )

  const toggleSound = () => {
    setSound(!sound.value)
  }

  return {
    sound,
    themes,
    theme,
    cursor,
    targetSize,
    setTheme,
    setCursor,
    setTargetSize,
    toggleSound,
  }
}
