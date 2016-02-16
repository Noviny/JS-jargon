var app = app || {};

app.DictionaryView = Backbone.View.extend({
  el: $('#jargon2'),

  initialize: function() {
    this.collection = new app.Dictionary();
    var view = this;
    this.collection.fetch({
      success: function() {
        console.log("rendering");
        view.render();
      }
    });

    // this.listenTo( this.collection, 'add', this.renderJargon );
    this.listenTo(this.collection, 'reset', this.render);
  },

  // render library by rendering each book in its collection
  render: function() {
    this.$el.html('')
    $('#jargon').html('')
    this.collection.each(function(item) {
      // console.log(item)
      this.renderJargon(item);
    }, this);
  },

  // render a book by creating a BookView and appending the
  // element it renders to the library's element
  renderJargon: function(item) {
    var jargonView = new app.JargonView({
      model: item
    });
    this.$el.append(jargonView.render().el);
  }
});
