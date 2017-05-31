var express = require('express');
var path = require('path');
var router = express.Router();
var Amazon = require('../models/amazonSchema');
var User = require('../models/user');
var FusionCharts = require("fusioncharts");
var PriceHistory = require('../models/historySchema');
var pricehistories = require('../models/historySchema');

router.post("/", function(req, res) {
  var userEmail = req.decodedToken.email;
  console.log('line 42 req.body', req.body.OfferSummary["0"].LowestNewPrice["0"].FormattedPrice["0"]);
  var currentDate = new Date();
  var thing = {
    Asin: req.body.ASIN[0],
    ItemTitle:req.body.ItemAttributes["0"].Title["0"],
    Price:req.body.OfferSummary["0"].LowestNewPrice["0"].FormattedPrice["0"],
    ProductGroup:req.body.ItemAttributes["0"].ProductGroup["0"],
    TimeStamp: currentDate
  }

  var databaseObject = new Amazon(thing);

  User.findOne({
    email: userEmail
  }, function(err, user) {
    if (err) {
      console.log('Error COMPLETING clearanceLevel query task', err);
      res.sendStatus(500);
    } else {
      console.log(user);
      if (user == null) {
        // If the user is not in the database, return a forbidden error status
        console.log('No user found with that email. Have you added this person to the database? Email: ', req.decodedToken.email);
        res.sendStatus(403);
      } else {
        databaseObject.save(function(err, databaseObject) {
          if (err) {
            console.log('Error COMPLETING ADD ITEM TO DB', err);
            res.status(500).send('not authorized saving to DB');
          } else {
            // return all of the results where a specific user has permission
            res.sendStatus(201);
          }
        })
      }
    }
  })
});

router.get("/getdb", function(req, res) {
  var userEmail = req.decodedToken.email;
  // Check the user's level of permision based on their email
  User.findOne({
    email: userEmail
  }, function(err, user) {
    if (err) {
      console.log('Error COMPLETING clearanceLevel query task', err);
      res.sendStatus(500);
    } else {
      console.log(user);
      if (user == null) {
        // If the user is not in the database, return a forbidden error status
        console.log('No user found with that email. Have you added this person to the database? Email: ', req.decodedToken.email);
        res.sendStatus(403);
      } else {
        Amazon.find({
        }, function(err, myStuff) {
          if (err) {
            console.log('Error COMPLETING secrecyLevel query task', err);
            res.sendStatus(500);
          } else {
            // return all of the results where a specific user has permission
            res.send(myStuff);
          }
        });
      }
    }
  });
});

//                                   get charts below
//  ===============================================================================================================================================================================

router.get("/getCharts/:Asin", function(req, res) {
  var userEmail = req.decodedToken.email;
  var paramAsin=req.params.Asin;
  console.log(paramAsin.Asin,"this is the asin");
  // var paramerTitle = req.query.factoryGet.ItemTitle;
  // Check the user's level of permision based on their email
  User.findOne({
    email: userEmail
  }, function(err, user) {
    if (err) {
      console.log('Error COMPLETING query task', err);
      res.sendStatus(500);
    } else {
      console.log(user);
      if (user == null) {
        // If the user is not in the database, return a forbidden error status
        console.log('No user found with that email. Have you added this person to the database? Email: ', req.decodedToken.email);
        res.sendStatus(403);
      } else {
        pricehistories.find({Asin:paramAsin
        }, function(err, myStuff) {
          if (err) {
            console.log('Error COMPLETING query task', err);
            res.sendStatus(500);
          } else {
            // return all of the results where a specific user has permission
            res.send(myStuff);
          }
        });
      }
    }
  });
});



module.exports = router;
