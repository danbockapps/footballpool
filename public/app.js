var app = angular.module('footballpool', []);

function MainCtrl($scope, $http, $rootScope, $interval) {
  $scope.entries = [];
  $scope.iter = 0;
  var gamesRemaining;

  $http.get('entries').then(function(response) {
    gamesRemaining = response.data.gamesRemaining;
    response.data.entries.forEach(function(element) {
      $scope.entries.push(
        new Entry(element.name, element.points, response.data.entries.length)
      );
    });
    
    $interval(function() {
      var startTime = new Date().getTime();
  
      while(new Date().getTime() < startTime + 1000) {
        $scope.iter++;
        simulateSeason($scope.entries, gamesRemaining);
      }
    }, 1000, 20);
    
  });
  
  function Entry(name, points, numEntries) {
    this.name = name;
    this.points = points;
    this.places = [];
    
    for(var i=0; i<numEntries; i++) {
      this.places[i] = 0;
    }
  }
  
  Entry.prototype.resetPoints = function() {
    this.simPoints = this.points;
  }
  
  function simulateSeason(entries, gamesRemaining) {
    entries.forEach(function(entry) {
      entry.resetPoints();
      for(var i=0; i<gamesRemaining; i++) {
        if(Math.random() > 0.5) {
          entry.simPoints++;
        }
      }
    });
  
    entries.sort(function(a, b) {
      if(a.simPoints < b.simPoints) return 1;
      if(a.simPoints > b.simPoints) return -1;
      return 0;
    });
  
    entries.forEach(function(entry, index) {
      entry.places[index]++;
    });
  }
}

app.controller('MainCtrl', MainCtrl);
