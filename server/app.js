var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var decoder = require('./modules/decoder');
var mongoConnection = require('./modules/mongo-connection');
var privateData = require('./routes/private-data');
var amazonData = require('./routes/amazon-tracker-data');
var databaseData = require('./routes/database-data');
var amazon = require('amazon-product-api');
var portDecision = process.env.PORT || 5000;
var cron = require('cron');

// var job = new cron.CronJob('* * * * *', function() {
//     console.log('Function executed!');
// }, null, true);

app.get('/', function(req, res){
  res.sendFile(path.resolve('./public/views/index.html'));
});

app.use(express.static('public'));
app.use(bodyParser.json());

mongoConnection.connect();


// Decodes the token in the request header and attaches the decoded token to req.decodedToken on the request.
app.use(decoder.token);

/* Whatever you do below this is protected by your authentication. */

// This is the route for your secretData. The request gets here after it has been authenticated.

// ---------------------------------- ------------------- ------------------- -------------------
//
 app.use("/privateData", privateData);

//
app.use("/amazonData", amazonData);
app.get("/databaseData", databaseData);

app.use("/databaseData", databaseData);

// ------------------- ------------------- ------------------- ------------------- -------------------
 app.use("/privateData", privateData);
  // this line needs to be in to use

app.listen(portDecision, function(){
  console.log("Listening on port: ", portDecision);
});
