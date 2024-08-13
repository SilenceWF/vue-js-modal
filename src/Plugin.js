import Modal from './components/Modal.vue'
import Dialog from './components/Dialog.vue'
import PluginCore from './PluginCore'

const Plugin = {
  install(app, options = {}) {
    if (app.config.globalProperties.$modal) {
      return
    }

    const plugin = PluginCore(options)

    app.config.globalProperties.$modal = plugin
    app.provide('$modal', plugin)

    app.mixin({
      mounted() {
        if (this.$root === this) {
          if (!plugin.context.root) {
            plugin.setDynamicModalContainer(this)
          }
        }
      }
    })

    /**
     * Sets custom component name (if provided)
     */
    Vue.component(plugin.context.componentName, Modal)

    /**
     * Registration of <Dialog/> component
     */
    if (options.dialog) {
      app.component('Dialog', Dialog)
    }
  }
}

export default Plugin
