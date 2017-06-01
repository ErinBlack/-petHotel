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

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

//listen
app.listen(3000, function(){
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
  res.send(200);

});
