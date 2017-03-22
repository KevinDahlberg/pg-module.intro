var express = require('express');
var router = express.Router();
var pg = require('pg');

var config = {
  database: "chi", //DB name
  host: 'localhost', //host for the DB
  port: 5432, // port for the database
  max: 10, // how many connections at one time
  idleTimeoutMillis: 30000 // 30 seconds to try to connect
};

var pool = new pg.Pool(config); //allows us to have more than one connection at a time

router.get('/', function(req, res){
  // SELECT * From "books";
  pool.connect(function(errorConnectingToDatabase, client, done){
    if(errorConnectingToDatabase) {
      console.log("Error connecting to DB");
      res.send(500);
    } else {
      console.log("connected");
      client.query('SELECT * From "books";', function(queryError, result){
        done();
        if(queryError){
          console.log("Error making query.");
          res.send(500);
        } else {
          res.send(result.rows);
        }
      });
    }
  });
});

router.post('/add', function(req, res){
  console.log(req.body);
  var title = req.body.title;
  var author = req.body.author;
  var publisher = req.body.publisher;
  var year = req.body.year;
  //INSERT INTO books (title, author) VALUES ('Awesome Book', 'Dumb Author');
  pool.connect(function(errorConnectingToDatabase, client, done){
    if(errorConnectingToDatabase) {
      console.log("Error connecting to DB");
      res.send(500);
    } else {
      console.log("connected");
      client.query("INSERT INTO books (title, author, publisher, year) VALUES ($1, $2, $3, $4);", [title, author, publisher, year], function(queryError, result){
        done();
        if(queryError){
          console.log("Error making query.");
          res.send(500);
        } else {
          res.sendStatus(201);
        }
      });
    }
  });
});
//

module.exports = router;
