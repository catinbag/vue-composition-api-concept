<template>
  <div id="app">
    <select v-model="selectedTab">
      <option value="techcrunch">TechCrunch</option>
      <option value="placeholder">Placeholder</option>
    </select>
    <hr />
    <TechCrunchView v-if="selectedTab === 'techcrunch'" />
    <PlaceholderView v-if="selectedTab === 'placeholder'" />
  </div>
</template>

<script>
import TechCrunchView from './components/TechCrunch.vue'
import PlaceholderView from './components/Placeholder.vue'

export default {
  name: 'App',
  components: {
    TechCrunchView,
    PlaceholderView
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
