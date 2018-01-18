/* global sap */
sap.ui.define([
  'sap/ui/core/mvc/Controller',
], function (Controller) {
  return Controller.extend('cf.nemo.controller.BaseController', {
    getRouter: function () {
      return this.getOwnerComponent().getRouter()
    },

    getResourceBundle: function () {
      return this.getOwnerComponent().getModel('i18n').getResourceBundle()
    },
  })
})
