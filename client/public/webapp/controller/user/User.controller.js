/* global sap $ */
sap.ui.define([
  'cf/nemo/controller/BaseController',
  'sap/ui/model/json/JSONModel',
  'sap/m/MessageToast',
], function (BaseController, JSONModel, MessageToast) {
  return BaseController.extend('cf.nemo.controller.user.User', {
    onInit: function () {
      const oJSONModel = new JSONModel()
      this.getView().setModel(oJSONModel)
      this.loadUserData()
    },

    loadUserData: function () {
      this.getView().getModel().loadData('/api/user')
    },

    getDialog: function () {
      if (!this.oDialog) {
        this.oDialog = sap.ui.xmlfragment('cf.nemo.view.user.UserCreate', this)
        this.getView().addDependent(this.oDialog)
      }

      return this.oDialog
    },

    onAddUser: function () {
      this.getDialog().open()
      this.loadUserData()
    },

    onDeleteUser: function (oEvent) {
      const that = this
      const oContext = oEvent.getSource().getParent().getBindingContext()
      const id = oContext.getProperty('id')

      $.ajax({
        url: '/api/user/' + id,
        type: 'DELETE',
      }).done(function () {
        MessageToast.show(that.getResourceBundle().getText('msgUserDeleted', [id]))
        that.loadUserData()
      }).fail(function () {
        MessageToast.show(that.getResourceBundle().getText('msgError'))
      })
    },

    onCloseAddUserDialog: function () {
      this.getDialog().close()
      this.getDialog().destroy()
      delete this.oDialog
    },

    onSaveAddUserDialog: function () {
      const that = this
      const lastName = sap.ui.getCore().byId('ipLastName').getValue()
      const firstName = sap.ui.getCore().byId('ipFirstName').getValue()

      if (lastName === '' || firstName === '') {
        MessageToast.show(that.getResourceBundle().getText('msgPleaseEnterAllValues'))
        return
      }

      const userData = {
        lastName: lastName,
        firstName: firstName,
      }

      $.ajax({
        url: '/api/user/',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(userData),
      }).done(function () {
        MessageToast.show(that.getResourceBundle().getText('msgUserAdded', [0]))
        that.loadUserData()
      }).fail(function () {
        MessageToast.show(that.getResourceBundle().getText('msgError'))
      })

      this.onCloseAddUserDialog()
    },

    onRefreshUser: function () {
      this.loadUserData()
    },
  })
})
