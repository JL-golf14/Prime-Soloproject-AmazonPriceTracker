
myApp.controller('TrackerController',["$firebaseAuth","$http", function($firebaseAuth, $http) {
  var auth = $firebaseAuth();
  var self = this;
  self.amazonProperty = {};
  self.newSecret = {};
  self.results =[];
  self.amazonData=[];
  self.myDBStuff={};


  getMySearch();
    function getMySearch(){
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


















}]);
