import { usePageTitle } from '@/composables/usePageTitle'
import { SITE_TITLE } from '@/utils/constants'
import { titleCase } from '@/utils/text'
import { ref, watch } from 'vue'

export function useRouter() {
  const { setTitle } = usePageTitle(`Home | ${SITE_TITLE}`)
  const route = ref('home')

  const push = newRoute => {
    route.value = newRoute
  }

  const isRoute = routeName => routeName === route.value

  const isInRoutes = routeNames => routeNames.includes(route.value)

  watch(route, newValue => {
    setTitle(`${titleCase(newValue)} | ${SITE_TITLE}`)
  })

  return { route, push, isRoute, isInRoutes }
}
