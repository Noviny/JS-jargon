var app = app || {};


app.AppRouter = Backbone.Router.extend({
  routes: {
    '': 'index',
    'undefined': 'viewUndefined',
    'jargon/:term': 'singleTermView'
  },

  index: function() {
    new app.DictionaryView();
  },

  viewUndefined: function() {
    $('#jargon2').html('');
    new app.AllRequestsView();
  },

  singleTermView: function(term) {
    $('#jargon').html('');
    $('#jargon2').html('')
    new app.SingleRequestView();
  }

});
