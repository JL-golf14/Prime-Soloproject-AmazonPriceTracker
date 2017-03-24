var express = require('express');
var path = require('path');
var router = express.Router();
var amazon = require('amazon-product-api');
var Amazon = require('../models/amazonSchema');




router.get('/', function (req,res){
  var index = req.params.index;
  console.log(index, "index");

  var client = amazon.createClient({
    awsTag: "jeremy",
    awsId:'AKIAIOZRXUNCRRIY5DDQ',
    awsSecret: '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'

  });
  client.itemSearch({
    ItemPage:5,
    Keywords:"top sellers",
    SearchIndex: 'All',
    ResponseGroup: 'Medium'
  }).then(function(results){
      res.send(results);
  }).catch(function(err){
    console.log('error retreiving results', err.Error);
    res.sendStatus(500);
  });

});

//
// router.post('/', function (req,res){
//   var searchObject = req.body;
//   var index = req.params.index;
//   console.log("made it to post router");
//
//   var client = amazon.createClient({
//     awsTag: "jeremy",
//     awsId:'AKIAIOZRXUNCRRIY5DDQ',
//     awsSecret: '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'
//
//   });
//   client.itemSearch({
//     ItemPage:5,
//     Keywords: searchObject.amazonSearch,
//     SearchIndex: 'All',
//     ResponseGroup: 'Medium'
//   }).then(function(results){
//     console.log("AZ ADD RESULTS",results);
//       res.send(results);
//   }).catch(function(err){
//     console.log('error retreiving results', err[0].Error);
//     res.sendStatus(500);
//   });
// });
//





//
//                      automate price function below ======================================================================================================================================================================================================================================



router.post('/', function (req,res){
  var searchObject = req.body;
  var index = req.params.index;
  console.log("made it to API POST TO DB router");

  var client = amazon.createClient({
    awsTag: "jeremy",
    awsId:'AKIAIOZRXUNCRRIY5DDQ',
    awsSecret: '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'
  });


  Amazon.find({}, function(err, myStuff) {
  if (err) {
    console.log('Error COMPLETING secrecyLevel query task', err);
    res.sendStatus(500);
  }


    ////////////////////////////////////////
    // return all of the results where a specific user has permission
    // res.send(myStuff);
    // console.log("MY STUFF FROM DB", myStuff);
//   }
// });
//////////////////////////////////////////
console.log("________LOG OF myStuff.asin",myStuff[0].Asin);

  client.itemSearch({
    ItemPage:5,
    ItemId: myStuff[0].Asin,
    IdType:'Asin',
    SearchIndex: 'All',
    ResponseGroup: 'Medium'
  }).then(function(results){
    console.log("AZ ADD RESULTS",results);
      res.send(results);
  }).catch(function(err){
    console.log('error retreiving results', err[0].Error);
    res.sendStatus(500);
  });

 });

//
});

// ======================================================================================================================================================================================================================================








module.exports = router;
