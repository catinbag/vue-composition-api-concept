<template>
  <div>
    <label>
      Category:
      <select v-model="filters.categories">
        <option v-for="category in availableCategories" :key="category.id" :value="category.id">
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
import { getPosts, getCategories } from '../api/techcrunch'

export default {
  name: 'TechCrunchView',
  components: {
    ThePagination
  },
  data() {
    return {
      categories: []
    }
  },
  computed: {
    availableCategories() {
      return [{ id: null, name: '(no category)' }, ...this.categories]
    }
  },
  methods: {
    async loadCategories() {
      this.categories = await getCategories()
    }
  },
  setup() {
    const { page, nextPage, prevPage, filters, items } = useFilterable({
      loadItems: getPosts,
      initFilter: { categories: null }
    })

    return {
      page,
      nextPage,
      prevPage,
      filters,
      items
    }
  },
  created() {
    this.loadCategories()
  }
}
</script>
