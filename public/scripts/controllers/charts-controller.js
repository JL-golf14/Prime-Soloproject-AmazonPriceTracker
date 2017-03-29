
myApp.controller('ChartController',["ChartsFactory","$firebaseAuth","$http",'$routeParams', function(ChartsFactory,$firebaseAuth, $http,$routeParams) {
  var auth = $firebaseAuth();
  var self = this;
  self.amazonProperty = {};
  self.newSecret = {};
  self.results =[];
  self.amazonData=[];
  self.amazonChart=[];
  self.factoryGet=ChartsFactory.factoryGet;



console.log("route params... on chart side",$routeParams);

// ChartsFactory.getAmazon($routeParams.Asin)


  // 3458346587634895634987569836598365986239462397846239874698236498236482364638946293846982736982735
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
            self.amazonChart = response;
          });
        });
      } else {
        console.log('Not logged in or not authorized. amazon side request');
        self.results = [];
      }

    });
  };



  // google.charts.load('current', {'packages':['annotationchart']});
  //       google.charts.setOnLoadCallback(drawChart);


        google.charts.load('current', {'packages':['line']});
            google.charts.setOnLoadCallback(drawChart);

drawChart();
        function drawChart() {
                var data = new google.visualization.DataTable();

                                data.addColumn('number', 'Date');
                                data.addColumn('number', 'Price')
for (var i = 0; i < self.amazonChart.length; i++) {
  console.log("self for loop log",self[i].amazonChart.Price);
                                data.addRows([
   [self[i].amazonChart.TimeStamp, self[i].amazonChart.Price]
 ]);

 var options = {
         chart: {
           title: 'Price of Product',
           subtitle: 'in singles of dollars (USD)'
         },
         width: 900,
         height: 500
       };

       var chart = new google.charts.Line(document.getElementById('linechart_material'));

       chart.draw(data, google.charts.Line.convertOptions(options));
     }
}




}]);
