var app = angular.module('footballpool', []);

function MainCtrl($scope, $http) {
  $scope.testMsg = 'Hello world';
}

app.controller('MainCtrl', MainCtrl);
