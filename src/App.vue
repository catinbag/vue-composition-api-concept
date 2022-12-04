<template>
  <div id="app">
    <select v-model="selectedTab">
      <option value="techcrunch">TechCrunch</option>
      <option value="placeholder">Placeholder</option>
    </select>
    <hr />
    <TechCrunch v-if="selectedTab === 'techcrunch'" />
    <Placeholder v-if="selectedTab === 'placeholder'" />
  </div>
</template>

<script>
import TechCrunch from './components/TechCrunch.vue'
import Placeholder from './components/Placeholder.vue'

export default {
  name: 'App',
  components: {
    TechCrunch,
    Placeholder
  },
  data() {
    return {
      selectedTab: 'techcrunch'
    }
  },

  watch: {
    selectedTab() {
      window.location.hash = ''
    }
  }
}
</script>

<style></style>
