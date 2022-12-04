import Vue from 'vue'

export function useFilterable({ loadItems, initFilter }, component) {
  const page = Vue.observable({ value: 1 })
  const filters = Vue.observable(initFilter)
  const items = Vue.observable({ value: [] })

  const watch = component.$watch.bind(component)

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
      page.value = pageValue
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

  window.addEventListener('hashchange', syncHash)
  component.$on('hook:beforeDestroy', () => window.removeEventListener('hashchange', syncHash))

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
      page.value = 1
      loadData()
      updateHash()
    },
    { deep: true }
  )

  return {
    page,
    filters,
    items
  }
}
