var application_root = __dirname,
  express = require( 'express' ), //Web framework
  path = require( 'path' ), //Utilities for dealing with file paths
  mongoose = require( 'mongoose' ); //MongoDB integration
  io = require('socket.io'); // Websocket support
var winston = require('winston');
winston.add(winston.transports.File, { filename: 'hackapp.log', json: false});
winston.remove(winston.transports.Console);



//Create server
var app = express(),
    http = require('http'),
    server = http.createServer(app),
    io = io.listen(server);
var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

  // intercept OPTIONS method
  if ('OPTIONS' == req.method) {
    res.send(200);
  }
  else {
    next();
  }
};
app.enable("jsonp callback");
// Configure server
app.configure( function() {
  app.use(allowCrossDomain);
  //parses request body and populates request.body
  app.use( express.bodyParser() );

  //checks request.body for HTTP method overrides
  app.use( express.methodOverride() );

  //perform route lookup based on url and HTTP method
  app.use( app.router );

  //Where to serve static content
  app.use( express.static( path.join( application_root, 'site') ) );

  //Show all errors in development
  app.use( express.errorHandler({ dumpExceptions: true, showStack: true }));
});

//Start server
var port = 8888;
app.listen( port, function() {
  winston.info('Express server listening on port ' + port + ' in ' + app.settings.env + ' mode');
})

// Routes
app.get( '/api', function( request, response ) {
  response.send( 'HackApp API is running\r\n\r\n' );
});


//mongoose.connect( 'mongodb://localhost/hackapp_database' );
if (process.env.MONGODB_PORT_27017_TCP_ADDR){
    console.log("Running in Docker container, using link")
    mongo_address = process.env.MONGODB_PORT_27017_TCP_ADDR
    mongo_port = process.env.MONGODB_PORT_27017_TCP_PORT
}
else{
    mongo_address = "localhost";
    mongo_port = "27017";
}
mongoose.connect( 'mongodb://'+ mongo_address + ':' + mongo_port +'/hackapp_database' );

//Schemas


var Project = new mongoose.Schema({
  name: String,
  description: String,
  github_url: String,
  production_url: String,
  demo_url: String
})

var Resource = new mongoose.Schema({
  name: String,
  description: String,
  link: String,
})
//Models
var ResourceModel = mongoose.model( 'Resource', Resource );
var ProjectModel = mongoose.model( 'Project', Project );


app.all('/api/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});


//Resources

app.get( '/api/resources', function( request, response ) {
  return ResourceModel.find( function( err, resource ) {
    if( !err ) {
      return response.json( resource ); // This is JSON. Do not, under any circumstances attempt to concatenate it with a string.
    } else {
      return winston.info( err );
    }
  });
});

app.post( '/api/resources', function( request, response ) {
  var resource = new ResourceModel({
    name: request.body.name,
    description: request.body.description,
    link: request.body.link,
  });
  resource.save( function( err ) {
    if( !err ) {
      return winston.info( 'created' );
    } else {
      return winston.info( err );
    }
  });
  return response.send( resource );
});


app.get( '/api/resources/:id', function( request, response ) {
  return ResourceModel.findById( request.params.id, function( err, resource ) {
    if( !err ) {
      return response.send( resource );
    } else {
      return winston.log( err );
    }
  });
});


app.delete( '/api/resources/:id', function( request, response ) {

  return ResourceModel.findByIdAndRemove( request.params.id, function( err, resource ) {

    if( !err ) {
      winston.log( 'Resource removed' );
      return response.send( '' );
    } else {
      winston.log( err );
    }
  });
});

// Projects

app.get( '/api/projects', function( request, response ) {
  return ProjectModel.find( function( err, project ) {
    if( !err ) {
      return response.json( project ); // This is JSON. Do not, under any circumstances attempt to concatenate it with a string.
    } else {
      return winston.info( err );
    }
  });
});

app.post( '/api/projects', function( request, response ) {
  var project = new ProjectModel({
    name: request.body.name,
    description: request.body.description,
    github_url: request.body.github_url,
    demo_url:request.body.demo_url,
    production_url:request.body.production_url
  });
  project.save( function( err ) {
    if( !err ) {
      return winston.info( 'created' );
    } else {
      return winston.info( err );
    }
  });
  return response.send( project );
});


app.get( '/api/projects/:id', function( request, response ) {
  return ProjectModel.findById( request.params.id, function( err, project ) {
    if( !err ) {
      return response.send( project );
    } else {
      return winston.log( err );
    }
  });
});


app.delete( '/api/projects/:id', function( request, response ) {

  return ProjectModel.findByIdAndRemove( request.params.id, function( err, project ) {

    if( !err ) {
      winston.log( 'Project removed' );
      return response.send( '' );
    } else {
      winston.log( err );
    }
  });
});


