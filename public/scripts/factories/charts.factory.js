myApp.factory('ChartsFactory',["$firebaseAuth","$http","$routeParams", function($firebaseAuth, $http,$routeParams) {
console.log("factory making some smoke");


var auth = $firebaseAuth();
var self = this;
var amazonProperty = {};
var newSecret = {};
var results =[];
var amazonData=[];
var factoryGet ={list:[]};







function getAmazon(){
  console.log("  factory AMAZON FUNCTION STARTED");
  auth.$onAuthStateChanged(function(firebaseUser){
    if(firebaseUser) {
      firebaseUser.getToken().then(function(idToken){
        $http({
          method: 'GET',
          url: '/amazonData',
          headers: {
            id_token: idToken
          }
        }).then(function(response){
          console.log("response factory get amazon ....................",response);
          factoryGet.list= response.data;
        });
      });
    }
    else {
      console.log('Not logged in or not authorized. amazon side request');
    }
  });
};





return{
  factoryGet : factoryGet,
  getAmazon:getAmazon
}



}]);
