var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var pg = require('pg');

var allOwners = [];
var port = 3000;
var config = {
database: 'pet_hotel',
host: 'localhost',
port: 5432,
max: 50
};

var pool = new pg.Pool(config);

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

//listen
app.listen(port, function(){
  console.log('server up on 3000');
});

app.get('/', function(req, res){
  console.log('url hit ');
  res.sendFile(path.resolve('public/views/index.html'));
});

app.post('/addOwner', function (req, res){
  console.log('post hit on /addOwner');
allOwners.push(req.body);
console.log('allOwners', allOwners);

pool.connect( function(err, connection, done){
  if( err ){
    console.log(err);
    done();
    res.send(400);
  }
else {
  console.log('connected to db');
  connection.query("INSERT INTO user_info (first_name, last_name) VALUES ('" + req.body.firstName + "'  , '" + req.body.lastName + "' )");
  done();
  res.send(200);
}

});







});
