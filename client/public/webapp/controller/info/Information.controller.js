/* global sap */
sap.ui.define([
  'cf/nemo/controller/BaseController',
  'sap/ui/model/json/JSONModel',
], function (BaseController, JSONModel) {
  return BaseController.extend('cf.nemo.controller.info.Information', {
    OnInit: function () {
      const oJSONModel = new JSONModel()
      this.getView().setModel(oJSONModel)
      this.loadInfoData()
    },

    loadInfoData: function () {
      this.getView().getModel().loadData('/api/info')
    },
  })
})
