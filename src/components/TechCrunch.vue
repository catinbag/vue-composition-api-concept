<template>
  <div>
    <label
      >Category:
      <select v-model="filters.categories">
        <option v-for="category in availableCategories" :key="category.id" :value="category.id">
          {{ category.name }}
        </option>
      </select>
    </label>
    <hr />
    <div>
      <button :disabled="page.value === 1" @click="prevPage">Prev</button>
      {{ page.value }}
      <button @click="nextPage">Next</button>
    </div>
    <hr />

    <ul>
      <li v-for="item in items.value" :key="item.id">
        <a target="_blank" :href="item.link" v-html="item.title.rendered" />
      </li>
    </ul>
  </div>
</template>
<script>
import { getPosts, getCategories } from '../api/techcrunch'
import { useFilterable } from './composables/filterable'

export default {
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
    const { page, nextPage, prevPage, filters, items } = useFilterable(
      {
        loadItems: getPosts,
        initFilter: { categories: null }
      },
      this
    )

    this.loadCategories()

    return {
      page,
      nextPage,
      prevPage,
      filters,
      items
    }
  }
}
</script>
