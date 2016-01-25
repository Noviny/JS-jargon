var app = app || {};

app.Requests = Backbone.Collection.extend({
  model: app.Request,
  url: '/api/requests'
});