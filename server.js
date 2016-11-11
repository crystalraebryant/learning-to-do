// set up ===========================================
var express           = require('express');
var app               = express();
var mongoose          = require ('mongoose');
var morgan            = require ('morgan');
var bodyParser        = require('body-parser');
var methodOverride    = require('method-override');

// configuration ====================================

mongoose.connect('mongodb://heroku_1k7gg4v0:kq5sc6ag84frfm80l780a392cn@ds151137.mlab.com:51137/heroku_1k7gg4v0');

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());

// define mode ======================================
var Todo = mongoose.model('Todo', {
    text: String
});

// listen (start app with node server.js) ===========
app.listen(8080);
console.log("App listening on port 8080");

// routes ============================================

// api ---------------------------------------------
// get all todos
app.get('/api/todos', function(req, res) {
Todo.find(function(err, todos) {
      if (err)
          res.send(err)
      res.json(todos);
  });
});

// create todo and send back all todos after creation
app.post('api/todos', function(req, res) {
    Todo.create({
        text : req.body.text,
        done: false
    }, function(err, todo) {
        if (err)
            res.send(err);

        Todo.find(function(err, todos) {
            if (err)
                res.send(err)
            res.json(todos);
        });
    });
});

// delete a todo
app.delete('api/todos/:todo_id', function(req, res) {
    Todo.remove({
        _id : req.params.todo_id
    }, function(err, todo) {
        if (err)
            res.send(err);

        Todo.find(function(err, todos) {
            if (err)
                res.send(err)
            res.json(todos);
        })
    })
})