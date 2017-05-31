
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
  self.sumPrice=0;
  self.avgPrice=0;
  self.price=0;



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




            for (var i = 0; i < self.amazonChart.data.length; i++) {
              self.price = self.amazonChart.data[i].Price;
              self.priceArray.push(self.amazonChart.data[i].Price)
              self.dateArray.push(self.amazonChart.data[i].TimeStamp)
              self.sumPrice += self.amazonChart.data[i].Price*100;
            }
            self.avgPrice = (self.sumPrice/100)/ self.amazonChart.data.length;
            console.log("average price===",self.avgPrice);





            new Chartist.Line('.ct-chart', {
              labels: self.dateArray,
              series: [
                self.priceArray

              ]
            }, {
              showArea: true,
              axisY: {
                onlyInteger: false
              },
              plugins: [
                Chartist.plugins.ctThreshold({
                  threshold:self.avgPrice
                })
              ]
            });


            self.labels = self.dateArray;
            self.series = ['Price TimeStamp', 'Series B'];
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




  getAmazon();
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
  // }
}]);
