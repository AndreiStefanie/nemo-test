/* global sap */
sap.ui.define([
  'sap/ui/core/UIComponent',
], function (UIComponent) {
  return UIComponent.extend('cf.nemo.Component', {
    metadata: {
      manifest: 'json',
    },

    init: function () {
      // call the init function of the parent
      UIComponent.prototype.init.apply(this)

      // initialize router
      this.getRouter().initialize()
    },
  })
})
