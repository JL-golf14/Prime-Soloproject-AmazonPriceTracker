myApp.controller("SampleCtrl",["$firebaseAuth","$http","$location", function($firebaseAuth, $http,$location) {

  var auth = $firebaseAuth();
  var self = this;
  self.amazonProperty = {};
  self.newSecret = {};
  self.results =[];
  self.amazonData =[];



  // This code runs whenever the user logs in
  self.logIn = function(){
    auth.$signInWithPopup("google").then(function(firebaseUser) {
      console.log("Firebase Authenticated as: ", firebaseUser.user.displayName);
            console.log("Firebase Authenticated clearanceLevel: ", firebaseUser.user.clearanceLevel);
    }).catch(function(error) {
      console.log("Authentication failed: ", error);
    });
  };


getAmazon()
function getAmazon(){
  console.log("AMAZON FUNCTION STARTED");
  auth.$onAuthStateChanged(function(firebaseUser){
    // firebaseUser will be null if not logged in
    if(firebaseUser) {
      // This is where we make our call to our server
      firebaseUser.getToken().then(function(idToken){
        $http({
          method: 'GET',
          url: '/amazonData',
          headers: {
            id_token: idToken
          }
        }).then(function(response){
          console.log("amazon response Data ....................",response);
          self.amazonData = response;
        });
      });
    } else {
      console.log('Not logged in or not authorized. amazon side request');
      self.results = [];
    }

  });
};









 self.addSearch = function(){
  console.log("AMAZON ADD CLicked ");
    var firebaseUser = auth.$getAuth();
    if(firebaseUser) {
      firebaseUser.getToken().then(function(idToken){
        $http({
          method: 'POST',
          url: '/amazonData',
          headers: {
            id_token: idToken
          },
          data:self.amazonProperty
        }).then(function(response){
          console.log("post to amazon from hmctrl....................",response);
          self.amazonData = response;
        });
      });
    } else {
      console.log('Not logged in or not authorized. amazon side request');
      self.results = [];
    }
};








self.saveItem = function(item){
 console.log("AMAZON save CLicked ",item);
   var firebaseUser = auth.$getAuth();
   if(firebaseUser) {
     // This is where we make our call to our server
     firebaseUser.getToken().then(function(idToken){
       $http({
         method: 'POST',
         url: '/databaseData',
         headers: {
           id_token: idToken
         },
         data:item
       }).then(function(response){
         console.log("amazon response Data ....................",response);
         //self.amazonData = response;
       });
     });
   } else {
     console.log('Not logged in or not authorized. amazon side request');
     self.results = [];
   }

};



// =====================================================================================================


  // This code runs when the user logs out
  self.logOut = function(){
    auth.$signOut().then(function(){
      console.log('Logging the user out!');
    });
  };
}]);
