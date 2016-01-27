var app = app || {};

app.DefineRequestView = Backbone.View.extend({
  tagName: 'div',
  className: 'addingJargon',
  template: $("#addTemplate").html(),

  render: function() {
    var tmpl = _.template( this.template );
    this.$el.html( tmpl( this.model.toJSON() ) );
    return this.$el
  }

})