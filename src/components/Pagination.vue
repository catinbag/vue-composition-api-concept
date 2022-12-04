<template>
  <div>
    <button :disabled="page.value === 1" @click="prevPage">Prev</button>
    {{ page.value }}
    <button @click="nextPage">Next</button>
  </div>
</template>

<script>
export default {
  name: 'ThePagination',
  props: {
    page: {
      type: Object,
      required: true
    }
  },
  methods: {
    nextPage() {
      this.$emit('next-page')
    },
    prevPage() {
      this.$emit('prev-page')
    }
  }
}
</script>
