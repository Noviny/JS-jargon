var app = app || {};

app.SingleRequestView = Backbone.View.extend({

  el: $('#jargon'),

  initialize: function() {
    app.requestsnew = new app.Requests();
    app.requestsnew.fetch({
      success: function () {
        var request = app.requestsnew.where({'term': 'fallacy'})
        console.log(request)
        var requestView = new app.DefineRequestView({
          model: request
        });
        console.log(requestView)

        this.$el.append(requstView.render())
      }
    })
  },

  renderRequest: function(item) {
    var requestView = new app.DefineRequestView({
      model: item
    });
    console.log(requestView.render())
    $('#jargon').append(requestView.render());
  }

});
