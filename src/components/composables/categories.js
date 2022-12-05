import { ref, watch } from '../../vue-patch'

const noCategoryItem = { id: null, name: '(no category)' }

export function useCategories({ loadFn }) {
  const categories = ref([])
  const availableCategories = ref([])

  async function load() {
    categories.value = await loadFn()
  }

  /* fake computed  */
  watch(
    () => categories,
    () => {
      availableCategories.value = [noCategoryItem, ...categories.value]
    },
    { deep: true }
  )

  load()

  return {
    availableCategories
  }
}
