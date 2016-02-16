var app = app || {};

app.AppView = Backbone.View.extend({
  el: $('#container'),
  template: $('#main-div-form').html(),

  events: {
    'submit #request-form': 'addNewRequest',
    'submit #addJargon': 'addNewJargon',
    'keyup #search': 'filterTerms'
  },

  initialize: function() {
  },

  render: function() {
    this.$el.html(this.template);
  },

  addNewRequest: function(e) {
    e.preventDefault();
    console.log("Will request a new term");
    var term = this.$('#request-term').val();
    var handle = this.$('#twitter-handle').val();
    handle = handle.replace(/@/, '');
    console.log(handle)

    if ( term !== "" ) {
      app.requests.create({
        'term': term,
        'tweethandle': handle
      });

      var tweetContent = "can you define '" + term + "' ?" + 'js-jargon.herokuapp.com/#jargon/' + term

      //TODO uncomment bellow to re-enable tweeting
      $.ajax({
        url: 'twitter',
        type: 'POST',
        dataType: 'json',
        data: {
          tweet: tweetContent
        }
      });

      //TODO alert to notify that request has been made
    }
  },

  addNewJargon: function(e) {
    e.preventDefault();
    var toDefine = this;
    var term = this.$('.term').val();
    var definition = this.$('.define-input').val();
    if (definition !== "") {
      app.dictionary.create({
        'term': term,
        'definition': definition
      });
      new app.DictionaryView()
    }
  },

  filterTerms: function() {
    console.log("TEST");
    //TODO make this actually filter
  }

});
