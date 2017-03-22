var express = require('express');
var app = express();
var bodyParser = require ('body-parser');
var port = 5000;
var books = require('./routes/books.js');

app.use(express.static('server/public', {
  index: 'views/index.html'}));
app.use(bodyParser.urlencoded({extended: true}));
app.use('/books', books);

app.listen(port, function(){
  console.log("listining on port: ", port, " yo.");
});
