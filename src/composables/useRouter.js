import { ref } from 'vue'

export function useRouter() {
  const route = ref('index')

  const push = newRoute => {
    route.value = newRoute
  }

  const isRoute = routeName => route.value === routeName

  const isInRoutes = routeNames => routeNames.includes(route.value)

  return { route, push, isRoute, isInRoutes }
}
