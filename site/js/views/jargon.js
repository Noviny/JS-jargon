var app = app || {};

app.JargonView = Backbone.View.extend({
  tagName: 'div',
  className: 'jargonContainer',
  template: $( '#jargonTemplate' ).html(),

  events: {
    'click .delete': 'deleteJargon'
  },

  deleteJargon: function() {
    //Delete model
    this.model.destroy();
    console.log(this);
    // $.ajax({

    // })

    //Delete view
    this.remove();
  },

  render: function() {
    //tmpl is a function that takes a JSON object and returns html
    var tmpl = _.template( this.template );

    //this.el is what we defined in tagName. use $el to get access to jQuery html() function
    this.$el.html( tmpl( this.model.toJSON() ) );

    return this;
  }
});
