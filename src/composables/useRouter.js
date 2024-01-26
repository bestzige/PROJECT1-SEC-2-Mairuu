import { usePageTitle } from '@/composables/usePageTitle'
import { titleCase } from '@/utils/text'
import { ref, watchEffect } from 'vue'

export function useRouter() {
  const { setTitle } = usePageTitle('Home | Mairuu Aim')
  const route = ref('home')

  const push = newRoute => {
    route.value = newRoute
  }

  const isRoute = routeName => route.value === routeName

  const isInRoutes = routeNames => routeNames.includes(route.value)

  watchEffect(() => {
    setTitle(`${titleCase(route.value)} | Mairuu Aim`)
  })

  return { route, push, isRoute, isInRoutes }
}
