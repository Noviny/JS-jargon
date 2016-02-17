/* jslint node: true */
/*globals ENV*/
'use strict';


var express = require('express');
var path = require('path');
var mongoose = require('mongoose');

var bodyParser = require('body-parser');
var multer = require('multer');
var errorHandler = require('errorhandler');
var methodOverride = require('method-override');

var Twitter = require('twitter');

var app = express();


if ('production' == app.get('env')) {
  var client = new Twitter({
    consumer_key: process.env.consumer_key,
    consumer_secret: process.env.consumer_secret,
    access_token_key: process.env.access_token_key,
    access_token_secret: process.env.access_token_secret
  });
}
//
if ('development' == app.get('env')) {
  var config = require('./info/exclude/config.json');
// //
  var client = new Twitter({
    consumer_key: config.consumer_key,
    consumer_secret: config.consumer_secret,
    access_token_key: config.access_token_key,
    access_token_secret: config.access_token_secret
  });
}


var mode = process.env.NODE_ENV;

var uristring =
  process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  // 'mongodb://heroku_t7nw9cf2:ojfbj4nj04s1vtu0uvadv5e27c@ds045001.mongolab.com:45001/heroku_t7nw9cf2'
  'mongodb://localhost/jargon_database';

mongoose.connect(uristring, function(err, res) {
  if (err) {
    console.log('the error is ', err, ' on ', uristring);
  } else {
    console.log('succeeded to connect to ', uristring);
  }
});


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
  tweethandle: String
});

//Models
var JargonModel = mongoose.model('Jargon', Jargon);
var RequestModel = mongoose.model('Request', Request);


app.set('port', process.env.PORT || 4711);
app.set('views', path.join(__dirname, 'views'));
app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
// app.use(multer({dest:'./uploads/'}).fields());

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'site')));
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/site/index.html'));
});

//Paths
app.get('/api', function(request, response) {
  response.send('Jargon API is running');
});

app.post('/twitter', function(request, response) {
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
app.get('/api/jargon/:id', function(request, response) {
  return JargonModel.findById(request.params.id, function(err, jargon) {
    if (!err) {
      return response.send(jargon);
    } else {
      return console.log(err);
    }
  });
});

app.get('/jargon/:term', function(req, resp) {
  return JargonModel.find({
    term: "req.params.term"
  }, function(err, jargon) {
    if (!err) {
      return resp.send(jargon + " " + req.params.term);
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
    tweethandle: req.body.tweethandle || "noviny"
  });
  request.save(function(err) {
    if (!err) {
      // TODO: Make the new path for a specific jargon term return the term
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
        console.log('jargon updated');
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

if ('development' == app.get('env')) {
  app.use(errorHandler());
}


app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
