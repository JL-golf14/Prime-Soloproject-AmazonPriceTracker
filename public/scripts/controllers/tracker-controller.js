
myApp.controller('TrackerController',["$firebaseAuth","$http","$routeParams","ChartsFactory", function($firebaseAuth, $http,$routeParams,ChartsFactory) {
  var auth = $firebaseAuth();
  var self = this;
  self.amazonProperty = {};
  self.newSecret = {};
  self.results =[];
  self.amazonData=[];
  self.myDBStuff=[];


  getMySearch();
    function getMySearch(){
      auth.$onAuthStateChanged(function(firebaseUser){
        // firebaseUser will be null if not logged in
        if(firebaseUser) {
          // This is where we make our call to our server
          firebaseUser.getToken().then(function(idToken){
            $http({
              method: 'GET',
              url: '/databaseData/getdb',
              headers: {
                id_token: idToken
              }
            }).then(function(response){
              console.log("RESPONSE FROM GET",response);
              self.myDBStuff = response.data;
            });
          });
        } else {
          console.log('Not logged in or not authorized.');
          self.myDBStuff =[];
        }

      });
    };

  self.getAmazonChart = function(stuff){
      console.log('getAmazonChart clicked');
      console.log("this is the stuff....",stuff);
      auth.$onAuthStateChanged(function(firebaseUser){
        // firebaseUser will be null if not logged in
        if(firebaseUser) {
          // This is where we make our call to our server
          firebaseUser.getToken().then(function(idToken){
            $http({
              method: 'GET',
              url: '/databaseData/getCharts/:',
              headers: {
                id_token: idToken
              },
              params: {
                  item: stuff.Asin
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















}]);
