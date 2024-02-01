import { onUnmounted, ref } from 'vue'

export function useInterval(callback, ms = 1000) {
  const counter = ref(0)
  let intervalId = null

  const start = () => {
    if (intervalId === null) {
      intervalId = setInterval(() => {
        if (callback) callback()
        counter.value++
      }, ms)
    }
  }

  const stop = () => {
    if (intervalId !== null) {
      clearInterval(intervalId)
      intervalId = null
    }
  }

  const resetCounter = () => {
    counter.value = 0
  }

  onUnmounted(stop)

  return { counter, resetCounter, start, stop }
}
