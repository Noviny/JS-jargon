var app = app || {};


$(document).ready(function () {
  // new app.DictionaryView();

  app.router = new app.AppRouter();
  Backbone.history.start()
});