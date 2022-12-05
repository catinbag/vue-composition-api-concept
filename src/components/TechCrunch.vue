<template>
  <div>
    <label>
      Category:
      <select v-model="filters.categories">
        <option
          v-for="category in availableCategories.value"
          :key="category.id"
          :value="category.id"
        >
          {{ category.name }}
        </option>
      </select>
    </label>
    <hr />
    <ThePagination :page="page" @next-page="nextPage" @prev-page="prevPage" />
    <hr />
    <ul>
      <li v-for="item in items.value" :key="item.id">
        <a target="_blank" :href="item.link">{{ item.title.rendered }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
import ThePagination from './Pagination.vue'
import { useFilterable } from './composables/filterable'
import { useCategories } from './composables/categories'
import { getPosts, getCategories } from '../api/techcrunch'

export default {
  name: 'TechCrunchView',
  components: {
    ThePagination
  },
  setup() {
    const { page, nextPage, prevPage, filters, items } = useFilterable({
      loadItems: getPosts,
      initFilter: { categories: null }
    })

    const { availableCategories } = useCategories({ loadFn: getCategories })

    return {
      page,
      nextPage,
      prevPage,
      filters,
      items,
      availableCategories
    }
  }
}
</script>
