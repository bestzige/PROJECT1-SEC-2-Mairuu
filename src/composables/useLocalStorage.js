import { onMounted, ref, watch } from 'vue'

export function useLocalStorage(key, defaultValue) {
  const state = ref()

  const setValue = value => {
    state.value = value
  }

  onMounted(() => {
    const item = localStorage.getItem(key)

    try {
      const value = item ? JSON.parse(item) : defaultValue
      state.value = value
    } catch {
      state.value = item
    }
  })

  watch(state, newState => {
    localStorage.setItem(
      key,
      typeof newState === 'object' ? JSON.stringify(newState) : String(newState),
    )
  })

  return { value: state, setValue }
}
