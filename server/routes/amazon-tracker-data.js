var express = require('express');
var path = require('path');
var router = express.Router();
var amazon = require('amazon-product-api');
var Amazon = require('../models/amazonSchema');
var PriceHistory = require('../models/historySchema');
var cron = require('cron');
var Asin="";
var currentDate = new Date
var FusionCharts = require("fusioncharts");

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
  // console.log("made it to post router");

  var client = amazon.createClient({
    awsTag: "jeremy",
    awsId:'AKIAIOZRXUNCRRIY5DDQ',
    awsSecret: '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'

  });
  client.itemSearch({
    ItemPage:5,
    Keywords: searchObject.amazonSearch,
    SearchIndex: searchObject.ProductGroup,
    ResponseGroup:'Large'
  }).then(function(results){



    results.SearchIndex = searchObject.ProductGroup;
      console.log("AZ ADD RESULTS",results);
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

var job = new cron.CronJob('0,15,30,45 * * * *', function() {
  console.log('backdoor Function executed!');

  Amazon.find({}, function(err, myStuff) {



    if (err) {

      console.log('Error COMPLETING secrecyLevel query task', err);
      res.sendStatus(500);
    }else{


        var client = amazon.createClient({
          awsTag: "jeremy",
          awsId:'AKIAIOZRXUNCRRIY5DDQ',
          awsSecret: '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'
        });

      // console.log("logging myStuff",myStuff);
      // for (var i = 0; i < 1; i++) {
      myStuff.forEach(function(myThing){


        console.log("myThingProduct Group is 1111111111111",myThing.ProductGroup,myThing.Asin);



        client.itemSearch({
          // Operation:'ItemSearch',
          // ItemPage:5,
          IdType:myThing.Asin,
          Title:myThing.ItemTitle,
          SearchIndex:"Electronics",
          ResponseGroup:'Large'
        }).then(
          function(results){
            if (err) {

              console.log("error errrrrrrrrr function after search  err===",err);


            }
            console.log("this loggs success after then!!!!!!2222222222222222222222222",

            results[0].Offers[0].Offer[0].OfferListing[0].Price[0].Amount[0],
            results[0].ItemAttributes[0].Title[0],
            results[0].ItemAttributes[0].PartNumber[0],
            currentDate



          );
            // console.log("thing logged here past then!!!!!!!! ..........",thing);




            var thing =  { ProductId:results[0].ItemAttributes[0].PartNumber[0],
              Asin:results[0].ASIN[0],
              ItemTitle:results[0].ItemAttributes[0].Title[0],
              Price:(results[0].Offers[0].Offer[0].OfferListing[0].Price[0].Amount[0] / 100.00),
              // ProductGroup:results.data["0"].ItemAttributes["0"].ProductGroup["0"],
              TimeStamp: currentDate
            };
            console.log("thing logged here   past then 3333333333333333!!!!!!!! ..........",thing);
            var priceHistory = new PriceHistory(thing);

            console.log("thing logged here   past then!!!!!!!! ..........",thing);

            priceHistory.save(function(thing) {

              console.log("thing logged after history object  HUUUUUUUGE!!!!!!!  333333333333");
              // insert goes here back to my database
            })
          }) // end .then
          .catch(function(err){
            console.log('error retreiving results', err);
           console.log('error with the function');
          });

        // } // end for loop
      }); // end of forEach
      };  // end else from error
    }); // end amazon find in my DB
    //
}, null, true);

  // =======================================================================================================================================================================================================================








  module.exports = router;
