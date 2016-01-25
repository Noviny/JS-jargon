var app = app || {};

app.Request = Backbone.Model.extend({
    defaults: {
        term: "",
        definition: "undefined",
        tweethandle: ""
    },

    parse: function( response ) {
    response.id = response._id;
    return response;
    }
});