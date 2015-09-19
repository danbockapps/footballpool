var app = angular.module('footballpool', []);

function MainCtrl($scope, $http, $rootScope) {
  $http.get('entries').then(function(response) {
    runSimulation(response.data, $rootScope);
  });
  
  $scope.$on('simulation-done', function(event, args) {
    $scope.displayData = entries;
  });
}

app.controller('MainCtrl', MainCtrl);
