var app = app || {};

app.DictionaryView = Backbone.View.extend({
    el: $( '#jargon' ),

    initialize: function() {
        this.collection = new app.Dictionary();
        var view = this
        this.collection.fetch({ success: function () {
            console.log("rendering")
            view.render();
        }});

        // this.listenTo( this.collection, 'add', this.renderJargon );
        this.listenTo( this.collection, 'reset', this.render );
    },

    events: {
        'click #add': 'addJargon',
        'keyup #search': 'updateSearch'
    },

  updateSearch: function () {
    console.log("TEST")
    search = $('#search').val().toUpperCase();
    console.log(search)
    // var searchExp = new RegExp("^" + search)
    // var selectedVal = "";
    // var $terms = $(".defined-term")
    // $.each($terms, function (index, el) {
    //   var val = $(this).find("."+selectedVal).text();
    //   console.log(val)
    //   if ( searchExp.test(val) ) {
    //     $(this).removeClass("hidden")
    //   } else {
    //     $(this).addClass("hidden")
    //   }
    // });
    // console.log(selectedVal + ' ' + search);
  },




    addJargon: function( e ) {
        e.preventDefault();
        console.log("JARGON")

        var formData = {};
//I do not understand what this function is doing
        $( '#addJargon div' ).children( 'input' ).each( function( i, el ) {
            if( $( el ).val() != "" )
            {
              formData[ el.id ] = $( el ).val();
            }
        });

        this.collection.create( formData );
    },

    // render library by rendering each book in its collection
    render: function() {
        console.log("in the render function")
        this.collection.each(function( item ) {
            console.log(item)
            this.renderJargon( item );
        }, this );
    },

    // render a book by creating a BookView and appending the
    // element it renders to the library's element
    renderJargon: function( item ) {
        var jargonView = new app.JargonView({
            model: item
        });
        this.$el.append( jargonView.render().el );
    }
});
