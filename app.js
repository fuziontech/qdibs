
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , mongodb = require('mongodb')
  , everyauth = require('everyauth')
  , config = require('./config/config')


var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'yourmom' }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

//twitter conf
everyauth.twitter
  .consumerKey(config.twitter.consumerKey)
    .consumerSecret(config.twitter.consumerSecret)
      .findOrCreateUser( function (session, accessToken, accessTokenSecret, twitterUserMetadata) {
	// find or create user logic goes here
	}).redirectPath('/');

//everyauth helper for express
everyauth.helpExpress(app);

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes

app.get('/', routes.index);

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
