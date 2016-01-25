var app = app || {};

app.Dictionary = Backbone.Collection.extend({
  model: app.Jargon,
  url: '/api/jargon'
});
