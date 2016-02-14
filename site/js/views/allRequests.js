var app = app || {};


app.AllRequestsView = Backbone.View.extend({

  el: $( '#jargon' ),

  initialize: function() {
    console.log("initializing");
    this.collection = new app.Requests();
    var view = this;
    this.collection.fetch({ success: function () {
     view.render();
   }});


    this.listenTo( this.collection, 'add', this.renderJargon );
    this.listenTo( this.collection, 'reset', this.render );
  },

  events: {
    'click #define': 'addJargonFromRequest'
  },

  render: function() {
      this.collection.each(function( item ) {
          this.renderRequest( item );
      }, this );
  },



//This should probably be moved into defineRequest.js
    // addJargonFromRequest: function (e) {
    //   e.preventDefault()
    //   //Need to be able to refer to the current dictionary here...

    //   console.log("this is ", this)

    //   this.collection = new app.Dictionary();
    //   dictionary = this.collection
    //   this.collection.fetch({ success: function () {
    //         console.log("addingTerm")
    //         dictionary.create({ 'term': 'GRABTERM', 'definition': "GRABDEF" })
    //     }});
    //   console.log("JARGON DEFINE")
    // },




  renderRequest: function( item ) {
    // console.log(item)
    var requestView = new app.DefineRequestView({
      model: item
    });
    thing = requestView;
    // console.log(thing)
    this.$el.append( requestView.render() );
  }

});
