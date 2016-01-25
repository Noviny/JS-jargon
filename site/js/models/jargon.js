var app = app || {};

app.Jargon = Backbone.Model.extend({
    defaults: {
        term: "",
        definition: "",
        status: "undefined"
    },

    parse: function( response ) {
    response.id = response._id;
    return response;
    }
});
