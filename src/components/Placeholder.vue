<template>
  <div>
    <label>UserId: <input v-model.lazy="filters.userId"/></label>
    <hr />
    <div>
      <button :disabled="page.value === 1" @click="page.value -= 1">Prev</button>
      {{ page.value }}
      <button @click="page.value += 1">Next</button>
    </div>
    <hr />
    <ul>
      <li v-for="item in items.value" :key="item.id">
        <a target="_blank" :href="`https://jsonplaceholder.typicode.com/posts/${item.id}`">
          {{ item.title }}
        </a>
      </li>
    </ul>
  </div>
</template>
<script>
import { getPosts } from '../api/placeholder'
import { useFilterable } from './composables/filterable'

export default {
  data() {
    return {
      items: []
    }
  },
  created() {
    const { page, filters, items } = useFilterable(
      {
        loadItems: getPosts,
        initFilter: { userId: '' }
      },
      this
    )

    this.items = items
    this.page = page
    this.filters = filters
  }
}
</script>
