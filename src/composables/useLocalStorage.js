import { onMounted, ref, watch } from 'vue'

export function useLocalStorage(key, defaultValue) {
  const state = ref(defaultValue)

  const setData = value => {
    state.value = value
    localStorage.setItem(key, typeof value === 'object' ? JSON.stringify(value) : String(value))
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
    setData(newState)
  })

  return { data: state, setData }
}
