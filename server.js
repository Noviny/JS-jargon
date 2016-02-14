/*jslint node: true */
'use strict';

// Module dependencies.
var application_root = __dirname,
  express = require('express'), //Web framework
  path = require('path'), //Utilities for dealing with file paths
  mongoose = require('mongoose'); //MongoDB integration


var config = require('./info/exclude/config.json');

// Twittery bits
var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: config.consumer_key,
  consumer_secret: config.consumer_secret,
  access_token_key: config.access_token_key,
  access_token_secret: config.access_token_secret
});

// TODO work on the twitter streaming API
  // Check out the joys of other people's tweet bots to see how they are managing this.
  // Make a new app that manages that if needed.
// TODO Remove passwords so this can be deployed to github.

//Create server
var app = express();

var mode = process.env.NODE_ENV;


var uristring =
  process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  // 'mongodb://heroku_t7nw9cf2:ojfbj4nj04s1vtu0uvadv5e27c@ds045001.mongolab.com:45001/heroku_t7nw9cf2'
  'mongodb://localhost/jargon_database';

var thePort = process.env.PORT || 4711;

//Connect to database
// if (mode === undefined) {
// 	mongoose.connect( 'mongodb://localhost/jargon_database' );

// } else {
mongoose.connect(uristring, function(err, res) {
  if (err) {
    console.log('the error is ', err, ' on ', uristring);
  } else {
    console.log('succeeded to connect to ', uristring);
  }
});
// }

//Schemas

// Just added Jargon model
var Jargon = new mongoose.Schema({
  term: String,
  definition: String,
  status: String,
});

var Request = new mongoose.Schema({
  term: String,
  definition: String,
  tweet_at: String
});

//Models
var JargonModel = mongoose.model('Jargon', Jargon);

var RequestModel = mongoose.model('Request', Request);

// Configure server
app.configure(function() {
  //parses request body and populates request.body
  app.use(express.bodyParser());

  //checks request.body for HTTP method overrides
  app.use(express.methodOverride());

  //perform route lookup based on url and HTTP method
  app.use(app.router);

  //Where to serve static content
  app.use(express.static(path.join(application_root, 'site')));

  //Show all errors in development
  app.use(express.errorHandler({
    dumpExceptions: true,
    showStack: true
  }));
});

// Routes
app.get('/api', function(request, response) {
  response.send('Jargon API is running');
});


// app.get( '/undefined', function( request, response ) {
// 	response.sendFile('/undefined.html')
// });

app.get('/twitter', function(request, response) {
  response.send(config.consumer_key);
});

app.post('/twitter', function(request, response) {
  console.log('the request is ', request.body.tweet);
  client.post('statuses/update', {
    status: request.body.tweet
  }, function(error, tweet, response) {
    if (!error) {
      console.log(tweet);
    } else {
      console.log(error);
    }
  });
});


//Get a list of all jargon
app.get('/api/jargon', function(request, response) {
  return JargonModel.find(function(err, jargon) {
    if (!err) {
      return response.send(jargon);
    } else {
      return console.log(err);
    }
  });
});

app.get('/api/request', function(req, resp) {
  return RequestModel.find(function(err, request) {
    if (!err) {
      return resp.send(request);
    } else {
      return console.log(err);
    }
  });
});

//Get a single jargon by id
// app.get( '/api/jargon/:id', function( request, response ) {
//   return JargonModel.findById( request.params.id, function( err, jargon ) {
//     if( !err ) {
//       return response.send( jargon );
//     } else {
//       return console.log( err );
//     }
//   });
// });

app.get('/api/request/:id', function(req, resp) {
  return RequestModel.findById(req.params.id, function(err, req) {
    if (!err) {
      return resp.send(req);
    } else {
      return console.log(err);
    }
  });
});


// Get a single piece of jargon by name

app.get('/jargon/:term', function(req, resp) {
  return RequestModel.find({
    "term": "jQuery"
  }, function(err, jargon) {
    if (!err) {
      return resp.send(jargon);
    } else {
      return console.log(err);
    }
  });
});







//Insert a new jargon
app.post('/api/jargon', function(request, response) {
  var jargon = new JargonModel({
    term: request.body.term,
    definition: request.body.definition,
  });
  jargon.save(function(err) {
    if (!err) {
      return console.log('created');
    } else {
      return console.log(err);
    }
    return response.send(jargon);
  });
});

app.post('/api/request', function(req, resp) {
  var request = new RequestModel({
    term: req.body.term,
    tweet_at: req.body.twitterhandle
  });
  request.save(function(err) {
    if (!err) {
      // TODO: Make the new path for a specific jargon term return the term
      var twit = "Can you define " + req.body.term + "?" + " " + "https://" + req.headers.host + "/jargon/" + req.body.term;
      //  console.log('the header is ' + req.host);
      client.post('statuses/update', {
        status: twit
      }, function(error, tweet, response) {
        if (!error) {
          // console.log(tweet);
        }
      });
      return console.log('created');
    } else {
      return console.log(err);
    }
    return resp.send("The term has been requested");
  });
});

//Update a term
app.put('/api/jargon/:id', function(request, response) {
  console.log('Updating jargon ' + request.body.term);
  return JargonModel.findById(request.params.id, function(err, jargon) {
    jargon.term = request.body.jargon;
    jargon.definition = request.body.definition;


    return jargon.save(function(err) {
      if (!err) {
        console.log('book updated');
      } else {
        console.log(err);
      }
      return response.send(jargon);
    });
  });
});

app.post('/api/define', function(req, resp) {
  console.log(req);
});

//Delete a term
app.delete('/api/jargon/:id', function(request, response) {
  console.log('Deleting jargon with id: ' + request.params.id);
  return JargonModel.findById(request.params.id, function(err, jargon) {
    return jargon.remove(function(err) {
      if (!err) {
        console.log('Jargon removed');
        return response.send('');
      } else {
        console.log(err);
      }
    });
  });
});

app.delete('/api/request/:id', function(req, resp) {
  console.log('Deleting request with id: ' + req.params.id);
  return RequestModel.findById(req.params.id, function(err, request) {
    return request.remove(function(err) {
      if (!err) {
        console.log('request removed');
        return resp.send('');
      } else {
        console.log(err);
      }
    });
  });
});

//Start server
var port = thePort;
app.listen(port, function() {
  console.log('Express server listening on port %d in %s mode', port, app.settings.env);
});
