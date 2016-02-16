var app = app || {};


$(document).ready(function() {

  app.dictionary = new app.Dictionary();
  app.dictionary.fetch();

  app.requests = new app.Requests();
  app.requests.fetch()

  app.router = new app.AppRouter();
  Backbone.history.start();
});
