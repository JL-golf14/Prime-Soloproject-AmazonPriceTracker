var express = require('express');
var path = require('path');
var router = express.Router();
var amazon = require('amazon-product-api');
var Amazon = require('../models/amazonSchema');
var PriceHistory = require('../models/historySchema');
var cron = require('cron');
var currentDate = new Date


router.get('/', function (req,res){
  console.log("get git for az");
  var client = amazon.createClient({
    awsTag: "jeremy",
  });
  client.itemSearch({
    ItemPage:5,
    Keywords:"computers",
    SearchIndex: 'Electronics',
    ResponseGroup: 'Large'
  }).then(function(results){
    res.send(results);
  }).catch(function(err){
    console.log('error retreiving results', err.Error);
    res.sendStatus(500);
  });
});

router.post('/', function (req,res){
  var searchObject = req.body;
  console.log(req.body,);
  var index = req.params.index;
  // console.log(req.params.index,"HERE>>>>>>>>>>>>>>>>>>>>>>>>>");
  // console.log("made it to post router");
  var client = amazon.createClient({
    awsTag: "jeremy",
    awsId:'4444444444444444444444',
    awsSecret: '44444444444444444444444444444444444444444444'
  });
  client.itemSearch({
    ItemPage:5,
    Keywords: searchObject.amazonSearch,
    SearchIndex: searchObject.ProductGroup,
    ResponseGroup:'Large'
  }).then(function(results){
    // console.log("searchObject MMMMMMMMMMMM",searchObject);
  //   console.log(results.length);
  // var productGroup = searchObject.ProductGroup;
  //    for (var i = 0; i < results.length-1; i++) {
  //     //  console.log(results[i],"QQQQQQQQQQQ");
    //  results.ItemAttributes[1].push(productGroup);
  //  }
    // console.log(searchObject,".......................");
    // results.SearchIndex = searchObject.ProductGroup;
      // console.log("AZ ADD RESULTS",results);
      console.log(results[0],"HERE>>>>>>>>>>>>>>>>>>>>>>>>>");

    res.send(results);
  }).catch(function(err){
    console.log('error retreiving results', err[0].Error);
    res.sendStatus(500);
  });
});


//                      automate price function below ====================================================================================================================================================================================================

var job = new cron.CronJob('0,20,40 * * * *', function() {
  Amazon.find({}, function(err, myStuff) {
    if (err) {
      console.log('Err', err);
      res.sendStatus(500);
    }else{
        var client = amazon.createClient({
          awsTag: "jeremy",
          awsId:'4444444444444444444444',
          awsSecret: '44444444444444444444444444444444444444444444'
        });
      myStuff.forEach(function(myThing){
        client.itemSearch({
          // Operation:'ItemSearch',
          // ItemPage:5,
          IdType:myThing.Asin,
          Title:myThing.ItemTitle,
          SearchIndex:myThing.ProductGroup,
          ResponseGroup:'Large'
        }).then(
          function(results){
            if (err) {
              console.log("server side err",err);
            }
            var thing =  { ProductId:results[0].ItemAttributes[0].PartNumber[0],
              Asin:results[0].ASIN[0],
              ItemTitle:results[0].ItemAttributes[0].Title[0],
              Price:(results[0].Offers[0].Offer[0].OfferListing[0].Price[0].Amount[0] / 100.00),
              ProductGroup:results.config.data["0"].ItemAttributes["0"].ProductGroup["0"],
              TimeStamp: currentDate
            };
            console.log(thing);
            var priceHistory = new PriceHistory(thing);
            priceHistory.save(function(thing) {
              console.log("Saved items to the DB at",thing);
              // insert goes here back to my database
            })
          }) // end .then
          .catch(function(err){
            console.log('error retreiving results', err);
           console.log('error with the function');
          });
      }); // end of forEach
      };  // end else from error
    }); // end amazon find in my DB
}, null, true);  // cron


  module.exports = router;
