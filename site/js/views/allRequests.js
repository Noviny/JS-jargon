var app = app || {};


app.AllRequestsView = Backbone.View.extend({

  el: $( '#jargon' ),

  initialize: function() {
    console.log("initializing")
    this.collection = new app.Requests();
    var view = this
    this.collection.fetch({ success: function () {
     view.render()
   }});
    

    this.listenTo( this.collection, 'add', this.renderJargon );
    this.listenTo( this.collection, 'reset', this.render );
  },

    render: function() {
        this.collection.each(function( item ) {
            this.renderRequest( item );
        }, this );
    },

    renderRequest: function( item ) {
      console.log(item)
      var requestView = new app.DefineRequestView({
        model: item
      })
      thing = requestView
      console.log(thing)
      this.$el.append( requestView.render() );
    }


})