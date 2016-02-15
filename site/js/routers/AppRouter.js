var app = app || {};


app.AppRouter = Backbone.Router.extend({
  routes: {
    '': 'index',
    'undefined': 'viewUndefined'
  },

  index: function() {
    new app.DictionaryView();
  },

  viewUndefined: function() {
    $('#jargon2').html('');
    new app.AllRequestsView();
  }

});