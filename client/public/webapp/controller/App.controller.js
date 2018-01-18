/* global sap */
sap.ui.define([
  'cf/nemo/controller/BaseController',
], function (BaseController) {
  return BaseController.extend('cf.nemo.controller.App', {
    onPressSideNavToggleButton: function () {
      const toolPage = this.getView().byId('toolPage')
      toolPage.setSideExpanded(!toolPage.getSideExpanded())
    },

    onItemSelect: function (oEvent) {
      switch (oEvent.getParameter('item').getKey()) {
        case 'info':
          this.getRouter().navTo('information')
          break
        case 'users':
          this.getRouter().navTo('users')
          break
        default:
          break
      }
    },
  })
})
