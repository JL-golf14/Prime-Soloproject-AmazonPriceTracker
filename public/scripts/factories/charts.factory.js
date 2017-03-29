myApp.factory('ChartsFactory',["$firebaseAuth","$http","$routeParams", function($firebaseAuth, $http,$routeParams) {
console.log("factory making some smoke");


var auth = $firebaseAuth();
var self = this;
var amazonProperty = {};
var newSecret = {};
var results =[];
var amazonData=[];
var factoryGet = {list:[]};
// self.myDBStuff=





// getAmazon();
function getAmazon(){
  console.log("AMAZON FUNCTION STARTED");
  // This code runs whenever the user changes authentication states
  // e.g. whevenever the user logs in or logs out
  // this is where we put most of our logic so that we don't duplicate
  // the same things in the login and the logout code




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
          factoryGet.amazonData = response;
        });
      });
    } else {
      console.log('Not logged in or not authorized. amazon side request');
      self.results = [];
    }

  });
};
return{
  factoryGet : factoryGet,
  getAmazon:getAmazon
}



}]);
