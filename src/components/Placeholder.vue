<template>
  <div>
    <label>UserId: <input v-model.lazy="filters.userId"/></label>
    <hr />
    <ThePagination :page="page" @next-page="nextPage" @prev-page="prevPage" />
    <hr />
    <ul>
      <li v-for="item in items.value" :key="item.id">
        <a target="_blank" :href="`${POST_URL}/${item.id}`">{{ item.title }}</a>
      </li>
    </ul>
  </div>
</template>
<script>
import ThePagination from './Pagination.vue'
import { useFilterable } from './composables/filterable'
import { getPosts } from '../api/placeholder'

export default {
  name: 'PlaceholderView',
  components: {
    ThePagination
  },
  setup() {
    const { page, nextPage, prevPage, filters, items } = useFilterable({
      loadItems: getPosts,
      initFilter: { userId: '' }
    })

    const POST_URL = 'https://jsonplaceholder.typicode.com/posts'

    return {
      page,
      nextPage,
      prevPage,
      filters,
      items,
      POST_URL
    }
  }
}
</script>
