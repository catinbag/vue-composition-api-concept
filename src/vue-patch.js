import Vue from 'vue'

let currentInstance = null

export function patchVue() {
  Vue.mixin({
    created() {
      if (this.$options.setup === undefined) {
        return
      }

      currentInstance = this
      const setupEntities = this.$options.setup()
      currentInstance = null

      Object.assign(this, setupEntities)
    }
  })
}

export function ref(value) {
  return Vue.observable({ value })
}

export function reactive(value) {
  return Vue.observable(value)
}

export function watch(...args) {
  return currentInstance.$watch(...args)
}

export function onBeforeDestroy(fn) {
  currentInstance.$on('hook:beforeDestroy', () => fn())
}

// TODO: wrap computed
