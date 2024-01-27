import { ref, watchEffect } from 'vue'

export function usePageTitle(defaultTitle) {
  const title = ref(defaultTitle)

  const setTitle = newTitle => {
    title.value = newTitle
  }

  watchEffect(() => {
    document.title = title.value
  })

  return { title, setTitle }
}
