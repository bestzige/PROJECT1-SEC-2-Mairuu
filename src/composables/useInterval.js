import { onUnmounted, ref } from 'vue'

export function useInterval(callback, ms = 1000) {
  const counter = ref(0)
  let intervalId = null

  const start = () => {
    if (intervalId === null) {
      intervalId = setInterval(() => {
        counter.value++
        callback()
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
