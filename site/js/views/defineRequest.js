var app = app || {};

app.DefineRequestView = Backbone.View.extend({
  tagName: 'div',
  className: 'addingJargon',
  template: $("#addTemplate").html(),

  events: {
    'click .define': 'addJargonFromRequest',
    'click .delete': 'deleteRequest'
  },


  addJargonFromRequest: function(e) {
    e.preventDefault();

    var toDefine = this;

    var term = this.$('.term').html();
    var definition = this.$('.definition').val();
    if (definition !== "") {
      this.collection = new app.Dictionary();
      dictionary = this.collection;
      this.collection.fetch({
        success: function() {
          dictionary.create({
            'term': term,
            'definition': definition
          });
          // Post to twitter if a handle was left
          if (toDefine.model.get('tweethandle')) {
            var tweetContent = '@' + toDefine.model.get('tweethandle') + ' ' + term + ": '" + definition + "'";
            $.ajax({
              url: 'twitter',
              type: 'POST',
              dataType: 'json',
              data: {
                tweet: tweetContent
              }
            });
          }
          //Delete the entry from the list of terms to define
          toDefine.model.destroy();
          toDefine.remove();
        }
      });
    }
  },

  deleteRequest: function() {
    //Delete model
    this.model.destroy();
    console.log(this);
    this.remove();
  },

  render: function() {
    var tmpl = _.template(this.template);
    this.$el.html(tmpl(this.model.toJSON()));
    return this.$el;
  }

});
