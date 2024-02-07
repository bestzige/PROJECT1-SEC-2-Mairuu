import { usePageTitle } from '@/composables/usePageTitle'
import { SITE_TITLE } from '@/utils/constants'
import { titleCase } from '@/utils/text'
import { ref, watchEffect } from 'vue'

export function useRouter() {
  const { setTitle } = usePageTitle(`Home | ${SITE_TITLE}`)
  const route = ref('home')

  const push = newRoute => {
    route.value = newRoute
  }

  const isRoute = routeName => route.value === routeName

  const isInRoutes = routeNames => routeNames.includes(route.value)

  watchEffect(() => {
    setTitle(`${titleCase(route.value)} | ${SITE_TITLE}`)
  })

  return { route, push, isRoute, isInRoutes }
}
