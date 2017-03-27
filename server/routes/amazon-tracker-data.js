var express = require('express');
var path = require('path');
var router = express.Router();
var amazon = require('amazon-product-api');
var Amazon = require('../models/amazonSchema');
var PriceHistory = require('../models/historySchema');
var cron = require('cron');
var Asin="";

router.get('/', function (req,res){


  var client = amazon.createClient({
    awsTag: "jeremy",
    awsId:'AKIAIOZRXUNCRRIY5DDQ',
    awsSecret: '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'

  });
  client.itemSearch({
    ItemPage:5,
    Keywords:"Top Sellers",
    SearchIndex: 'All',
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
  var index = req.params.index;
  console.log("made it to post router");

  var client = amazon.createClient({
    awsTag: "jeremy",
    awsId:'AKIAIOZRXUNCRRIY5DDQ',
    awsSecret: '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'

  });
  client.itemSearch({
    ItemPage:5,
    Keywords: searchObject.amazonSearch,
    SearchIndex: searchObject.ProductGroup,
    ResponseGroup: 'Large'
  }).then(function(results){
    // console.log("AZ ADD RESULTS",results);
    res.send(results);
  }).catch(function(err){
    console.log('error retreiving results', err[0].Error);
    res.sendStatus(500);
  });
});


//                      automate price function below ======================================================================================================================================================================================================================================

// Cron, every hour run this code
// for each item in the "products" collection
// make a request on the ASIN for a current price
// insert that price into product-price-history {_id: auto generated, product_id: point back to other collection (currentProduct._id), price: snapshot at current time when cron runs (from Amazon), time: when cron ran (mongoose default)}



//


////cron goes here


// router.get('/runcron', function(req, res) {

 var job = new cron.CronJob('* * * * *', function() {
 //  console.log('backdoor Function executed!');
 // //




  Amazon.find({}, function(err, myStuff) {
    if (err) {
      console.log('Error COMPLETING secrecyLevel query task', err);
      res.sendStatus(500);
    }else{
      // console.log("logging myStuff",myStuff);
      for (var i = 0; i < 1; i++) {
        console.log("mystuff[i] is .........", i);


        var client = amazon.createClient({
          awsTag: "jeremy",
          awsId:'AKIAIOZRXUNCRRIY5DDQ',
          awsSecret: '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'
        });

        client.itemSearch({
          Operation:'ItemLookup',
          ItemPage:5,
          IdType:'Asin',
          ItemId:myStuff[i].Asin,
          // ProductGroup: 'myStuff[i].ProductGroup',
          // Title:myStuff[i].Title,
          ResponseGroup: 'Offers'
        }).then(
          function(results){
            console.log("AZ ADD RESULTS............_____________>>>>>>>>>>>>",results);

              var thing =  { ProductId:myStuff[i]._id,
                Asin: results.data["0"].ASIN["0"],
                ItemTitle:results.data["0"].ItemAttributes["0"].Title["0"],
                Price:results.data["0"].OfferSummary["0"].LowestNewPrice["0"].FormattedPrice["0"],
                // ProductGroup:results.data["0"].ItemAttributes["0"].ProductGroup["0"],
                TimeStamp: currentDate
              };

              var priceHistory = new PriceHistory (thing);

              console.log("thing logged here..........",thing);

              PriceHistory.save(function(err, thing) {

                console.log("thing logged after history object");
                res.sendStatus(201);

                // insert goes here back to my database
              })

          }) // end .then
          .catch(function(err){
            console.log('error retreiving results', err[0].Error);
            res.sendStatus(500);
          });

        } // end for loop
      };
    }); // end amazon find in my DB
    //
  }); /* null, true);*/

  // ======================================================================================================================================================================================================================================








  module.exports = router;
