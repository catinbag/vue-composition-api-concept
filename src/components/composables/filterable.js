import { watch, onBeforeDestroy, ref, reactive } from './../../vue-patch'

export function useFilterable({ loadItems, initFilter }, component) {
  const page = ref(1)

  function setPage(val) {
    page.value = Number(val)
  }

  function nextPage() {
    setPage(page.value + 1)
  }

  function prevPage() {
    setPage(page.value - 1)
  }

  const filters = reactive(initFilter)
  const items = ref([])

  async function loadData() {
    const responseItems = await loadItems({
      page: page.value,
      filters
    })

    items.value = responseItems
  }

  function syncHash() {
    const urlParams = new URLSearchParams(window.location.hash.substring(1))
    const { page: pageValue, ...filtersValue } = Object.fromEntries(urlParams.entries())
    if (pageValue !== undefined) {
      setPage(pageValue)
    }

    Object.entries(filtersValue).forEach(([key, value]) => {
      filters[key] = value
    })
  }

  function updateHash() {
    const urlParams = new URLSearchParams()
    if (page.value !== 1) {
      urlParams.append('page', page.value)
    }
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        urlParams.append(key, value)
      }
    })
    window.location.hash = urlParams.toString()
  }

  syncHash()
  loadData()

  watch(
    () => page.value,
    () => {
      loadData()
      updateHash()
    }
  )

  watch(
    () => filters,
    () => {
      /* bug, double value setting */
      page.value = 1
      loadData()
      updateHash()
    },
    { deep: true }
  )

  window.addEventListener('hashchange', syncHash)
  onBeforeDestroy(() => window.removeEventListener('hashchange', syncHash))

  return {
    page,
    nextPage,
    prevPage,
    filters,
    items
  }
}
