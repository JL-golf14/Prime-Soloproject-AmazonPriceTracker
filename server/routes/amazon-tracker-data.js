var express = require('express');
var path = require('path');
var router = express.Router();
var amazon = require('amazon-product-api');





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


  // client.itemSearch({
  //   keywords : "",
  //   searchIndex: index,
  //   responseGroup: 'ItemAttributes,Offers,Images'
  // }, function(err, results, response) {
  //   if (err) {
  //     console.log(err,"client search err");
  //   } else {
  //     console.log(results);  // products (Array of Object)
  //     console.log(response); // response (Array where the first element is an Object that contains Request, Item, etc.)
  //
  //   }
  // });
});


router.post('/', function (req,res){
  var searchObject = req.body;
  var index = req.params.index;
  console.log(index, "index");

  var client = amazon.createClient({
    awsTag: "jeremy",
    awsId:'AKIAIOZRXUNCRRIY5DDQ',
    awsSecret: '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'

  });
  client.itemSearch({
    ItemPage:10,
    Keywords: searchObject.amazonSearch,
    SearchIndex: 'All',
    ResponseGroup: 'Medium'
  }).then(function(results){
    console.log("AZ ADD RESULTS",results);
      res.send(results);
  }).catch(function(err){
    console.log('error retreiving results', err.Error);
    res.sendStatus(500);
  });
});

module.exports = router;
