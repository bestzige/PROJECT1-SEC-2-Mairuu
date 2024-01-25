import { watchEffect } from 'vue'

export function usePageTitle(titleRef) {
  watchEffect(() => {
    document.title = titleRef.value
  })
}
