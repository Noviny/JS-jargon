var app = app || {};

app.JargonView = Backbone.View.extend({
  tagName: 'tr',
  className: 'jargonContainer',
  template: $('#jargonTemplate2').html(),

  events: {
    'click .delete': 'deleteJargon',
    'click .refine': 'refineJargon'
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

  refineJargon: function() {
    console.log("refining should occur");
  },

  render: function() {
    //tmpl is a function that takes a JSON object and returns html
    var tmpl = _.template(this.template);

    //this.el is what we defined in tagName. use $el to get access to jQuery html() function
    this.$el.html(tmpl(this.model.toJSON()));

    return this;
  }
});