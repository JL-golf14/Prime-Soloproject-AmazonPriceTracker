
myApp.controller('ChartController',["$firebaseAuth","$http",'$routeParams', function($firebaseAuth, $http,$routeParams) {
  var auth = $firebaseAuth();
  var self = this;
  self.amazonProperty = {};
  self.newSecret = {};
  self.results =[];
  self.amazonData=[];
  self.dateArray=[];
  self.amazonChart={data:[]};
  self.priceArray=[];



  console.log("route params... on chart side",$routeParams);

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
            console.log("amazon response Data from charts ....................",response);
            self.amazonChart.data = response.data;
            // return self.amazonChart.data[];


            console.log("price array",self.priceArray);
            console.log("az chart after function",self.amazonChart.data[6].Price);


            for (var i = 1; i < self.amazonChart.data.length; i++) {
              var price = self.amazonChart.data[i].Price;
              self.priceArray.push(self.amazonChart.data[i].Price)
              self.dateArray.push(self.amazonChart.data[i].TimeStamp)
            }



            self.labels = self.dateArray;
            self.series = ['Series A', 'Series B'];
            self.data = [self.priceArray
            ]
            self.onClick = function (points, evt) {
              console.log(points, evt);

              self.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
              self.options = {
                scales: {
                  yAxes: [
                    {
                      id: 'y-axis-1',
                      type: 'linear',
                      display: true,
                      position: 'left'
                    },
                    {
                      id: 'y-axis-2',
                      type: 'linear',
                      display: true,
                      position: 'right'
                    }
                  ]
                }
              };
            };


          }) //ends then 1
        });  // ends then  number 2
      }   // ends if
    }); //ends firebaseAuth
  };  //ends function

  // }
}]);
