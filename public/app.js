var app = angular.module('footballpool', []);

function MainCtrl($scope, $http) {
  $scope.testMsg = 'Hello world';
  
  $http.get('entries').then(function(response) {
    runSimulation(response.data);
  });
}

app.controller('MainCtrl', MainCtrl);
