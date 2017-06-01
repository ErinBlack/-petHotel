var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var pg = require('pg');

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
});//end listen

app.get('/', function(req, res){
  console.log('url hit ');
  res.sendFile(path.resolve('public/views/index.html'));
}); //end get


// posting owner info to database on register owner function
app.post('/addOwner', function (req, res){
  var allOwners = [];
  console.log('post hit on /addOwner');
allOwners.push(req.body);
console.log('allOwners', allOwners);

pool.connect( function(err, connection, done){
  if( err ){
    console.log(err);
    done();
    res.send(400);
  }// end if
else {
  console.log('connected to db');
  connection.query("INSERT INTO user_info (first_name, last_name) VALUES ('" + req.body.firstName + "'  , '" + req.body.lastName + "' )");
  done();
  res.send(200);
}// end else

}); //end pool connect

});// end post addOwner

// getting all owners from the db
app.get('/addOwner', function(req, res){
  var allOwners = [];
  console.log('executed addOwner get');
  pool.connect( function(err, connection, done){
    if( err ){
      console.log(err);
      done();
      res.send(400);
    }// end if
  else {
    console.log('connected to db');
    var resultSet = connection.query("SELECT * FROM user_info");
    resultSet.on('row', function(row){
      allOwners.push(row);
    }); //end
    resultSet.on('end', function(){
      done();
      res.send(allOwners);
    }); //end
  }// end else
  }); //end pool connect
}); //end get

// getting pets from client side
app.post('/addPet', function(req,res){
  console.log('addPet url hit');
  res.send(200);
});
