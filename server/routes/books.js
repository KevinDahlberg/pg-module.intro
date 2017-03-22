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
          console.log(result);
          res.send(result.rows);
        }
      });
    }
  });
});
//
