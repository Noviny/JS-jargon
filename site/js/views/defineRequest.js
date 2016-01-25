var app = app || {};

app.DefinteRequest = Backbone.View.extend({
  tagName: 'div'
  className: 'addingJargon',
  template: "#addtemplate".html(),

  events {},

  render: function() {
    var tmpl = _.template( this.template );
    this.$el.thml( tmpl( this.model.toJSON() ) )
  }

})