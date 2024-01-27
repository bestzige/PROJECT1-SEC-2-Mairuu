import { computed, ref } from 'vue'

export function usePagination({ data, perPage, initPage }) {
  const dataRef = ref(data)
  const perPageRef = ref(perPage)
  const currentPageRef = ref(initPage)

  const currentPage = computed(() => currentPageRef.value)

  const paginatedData = computed(() => {
    const start = (currentPageRef.value - 1) * perPageRef.value
    const end = currentPageRef.value * perPageRef.value
    return dataRef.value.slice(start, end)
  })

  const totalPages = computed(() => Math.ceil(dataRef.value.length / perPageRef.value))

  const nextPage = () => {
    if (currentPageRef.value < totalPages.value) {
      currentPageRef.value++
    }
  }

  const prevPage = () => {
    if (currentPageRef.value > 1) {
      currentPageRef.value--
    }
  }

  const setPage = page => {
    if (typeof page !== 'number') {
      throw new Error('page must be a number')
    }

    if (page >= 1 && page <= totalPages.value) {
      currentPageRef.value = page
    }
  }

  const isLastPage = computed(() => currentPageRef.value === totalPages.value)
  const isFirstPage = computed(() => currentPageRef.value === 1)

  return {
    currentPage,
    paginatedData,
    nextPage,
    prevPage,
    setPage,
    totalPages,
    isLastPage,
    isFirstPage,
  }
}
