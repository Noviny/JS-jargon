var app = app || {};

app.SingleRequestView = Backbone.View.extend({

  el: $('#jargon'),

  initialize: function() {
    app.requestsnew = new app.Requests();
    app.requestsnew.fetch({
      success: function () {
        var request = app.requestsnew.findWhere({'term': 'fallacy'})
        console.log(request)
        var requestView = new app.DefineRequestView({
          model: request
        });
        console.log(requestView)

        $('#jargon').append(requestView.render())
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
