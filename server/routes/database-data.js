var express = require('express');
var path = require('path');
var router = express.Router();



router.post("/", function(req, res) {
    var userEmail = req.decodedToken.email;
    console.log('line 42 req.body', req.body);
    var databaseObject = new Amazon(req.body);




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



    databaseObject.save(function(err, secrets) {
        if (err) {
            console.log('Error COMPLETING ADD ITEM TO DB', err);
            res.status(500).send('not authorized saving to DB');
        } else {
            // return all of the results where a specific user has permission
            res.sendStatus(201);

    // // var user = user.clearanceLevel:2;
    // secretObject.secrecyLe








module.exports = router;
