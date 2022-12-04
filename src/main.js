import Vue from 'vue'
import App from './App.vue'
import { patchVue } from './vue-patch'

patchVue()

new Vue({
  render: h => h(App)
}).$mount('#app')
