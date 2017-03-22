var express = require('express');
var path = require('path');
var router = express.Router();
var amazon = require('amazon-product-api');
// var router = require('koa-router');
//
// var app = koa();
// app.use(router(app));

// app.get('/', function(req, res) {
//   res.sendFile(path.resolve('./server/public/views/index.html'));

// Serve back static files
// app.use(express.static('./server/public'));

// Handle index file separately

// router.get('/',function(req,res){
//   console.log("making contact with empty amazon get");
//   res.sendStatus(200);
// });


router.get('/', function (req,res){
  var index = req.params.index;
  console.log(index, "index");

  var client = amazon.createClient({
    awsTag: "jeremy",
    awsId:'AKIAIOZRXUNCRRIY5DDQ',
    awsSecret: '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'

  });
  // console.log("hitting the api");
  // this.body = yield client.itemSearch({
  //   keywords: this.query.title,
  //   searchIndex: this.params.index,
  //   responseGroup: 'ItemAttributes,Offers,Images'
  // });


  client.itemSearch({
    ItemPage:5,
    Keywords:"glasses",
    SearchIndex: 'All',
    ResponseGroup: 'Medium'
  }).then(function(results){
    console.log('RESULTS:', results);
    console.log('number of results: ', results.length);
    console.log('OFFERS of first item: ', results[0].Offers);
      res.send(results[0]);
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



// client.itemSearch({
//   director: 'Quentin Tarantino',
//   actor: 'Samuel L. Jackson',
//   searchIndex: 'DVD',
//   responseGroup: 'ItemAttributes,Offers,Images'
// }, function(err, results, response) {
//   if (err) {
//     console.log(err,"client search err");
//   } else {
//     console.log(results);  // products (Array of Object)
//     console.log(response); // response (Array where the first element is an Object that contains Request, Item, etc.)
//   }
// });


//
//
//
// client.browseNodeLookup({
//   browseNodeId: '549726',
//   responseGroup: 'NewReleases'
// }, function(err, results, response) {
//   if (err.object) {
//     console.log(err);
//   } else {
//     console.log(results);
//   }
// });

//
// client.itemLookup({
//   idType: 'UPC',
//   itemId: '884392579524'
// }).then(function(results) {
//   console.log(JSON.stringify(results));
// }).catch(function(err) {
//   console.log(err);
// });

// client.itemSearch({
//   director: 'Quentin Tarantino',
//   actor: 'Samuel L. Jackson',
//   searchIndex: 'DVD',
//   responseGroup: 'ItemAttributes,Offers,Images'
// }, function(err, results, response) {
//   if (err) {
//     console.log(err,"client search err");
//   } else {
//     console.log(results);  // products (Array of Object)
//     console.log(response); // response (Array where the first element is an Object that contains Request, Item, etc.)
//   }
// });

// app.set('port', process.env.PORT || 5000);
// app.listen(app.get('port'), function() {
//   console.log('Listening on port: ', app.get('port'));
// });


module.exports = router;
