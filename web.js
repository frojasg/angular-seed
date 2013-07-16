var express = require('express'),
    routes = require('./routes');


var app = express();

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(__dirname + '/public'));
  app.use(express.static(__dirname + '/public/js'));
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes



app.get('/', routes.index);
app.get('/partials/:name', routes.partials);
app.get('/linkedin', routes.linkedin);


// redirect all others to the index (HTML5 history)
app.get('*', routes.index);

var port = process.env.PORT || 5000;
app.listen(port, function(){
  console.log("Express server listening on port %d", port);
});


app.use(express.logger());
