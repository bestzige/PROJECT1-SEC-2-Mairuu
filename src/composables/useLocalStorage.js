import { onBeforeMount, ref, watch } from 'vue'

export function useLocalStorage(key, defaultValue) {
  const state = ref(defaultValue)

  const setData = value => {
    state.value = value
  }

  onBeforeMount(() => {
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

  return { data: state, setData }
}
