import { onUnmounted, ref } from 'vue'

export function useInterval(callback, ms = 1000) {
  const counter = ref(0)
  let interval = null

  const start = () => {
    if (interval !== null) return
    interval = setInterval(() => {
      counter.value++
      callback()
    }, ms)
  }

  const stop = () => {
    if (interval !== null) {
      clearInterval(interval)
      interval = null
    }
  }

  const resetCounter = () => {
    counter.value = 0
  }

  onUnmounted(stop)

  return { counter, resetCounter, start, stop }
}
