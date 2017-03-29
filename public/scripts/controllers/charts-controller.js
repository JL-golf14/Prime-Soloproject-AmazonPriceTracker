
myApp.controller('ChartController',["ChartsFactory","$firebaseAuth","$http",'$routeParams', function(ChartsFactory,$firebaseAuth, $http,$routeParams) {
  var auth = $firebaseAuth();
  var self = this;
  self.amazonProperty = {};
  self.newSecret = {};
  self.results =[];
  self.amazonData=[];
  self.factoryGet=ChartsFactory.factoryGet;



console.log($routeParams);

ChartsFactory.getAmazon($routeParams.Asin)





















  // 3458346587634895634987569836598365986239462397846239874698236498236482364638946293846982736982735

  function getAmazonChart(){
    auth.$onAuthStateChanged(function(firebaseUser){
      // firebaseUser will be null if not logged in
      if(firebaseUser) {
        // This is where we make our call to our server
        firebaseUser.getToken().then(function(idToken){
          $http({
            method: 'GET',
            url: '/databaseData/getCharts',
            headers: {
              id_token: idToken
            },
            params: {
                item: self.factoryGet
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
