
myApp.controller('TrackerController',["$firebaseAuth","$http","$routeParams", function($firebaseAuth, $http,$routeParams) {
  var auth = $firebaseAuth();
  var self = this;
  self.amazonProperty = {};
  self.newSecret = {};
  self.results =[];
  self.amazonData=[];
  self.amazonChart=[];
  self.myDBStuff=[];


// ChartsFactory.getAmazon($routeParams.Asin)

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

        }

      });
    };

getAmazonChart();
function getAmazonChart(){
    auth.$onAuthStateChanged(function(firebaseUser){
      // firebaseUser will be null if not logged in
      if(firebaseUser) {
        // This is where we make our call to our server
        firebaseUser.getToken().then(function(idToken){
          $http({
            method: 'GET',
            url: '/databaseData/getCharts/'+$routeParams.Asin,
            headers: {
              id_token: idToken
            }
          }).then(function(response){
            console.log("amazon response Data ....................",response);
            self.amazonChart = response.data;




                          self.amazonChart.data = response.data;

          });
        });
      } else {
        console.log('Not logged in or not authorized. amazon side request');
        self.results = [];
      }

    });
  };











}]);
