var app = app || {};


app.AppRouter = Backbone.Router.extend({
  routes: {
    '': 'index',
    '/#undefined' : 'viewUndefined'
  },

  index: function () {
    new app.DictionaryView()
  },

  viewUndefined: function () {
    console.log("CHANGES")
    new app.DefineRequestView()
  }

})