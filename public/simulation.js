var iter = 1000;
var gamesRemaining;
var entries = [];

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

Entry.prototype.pctDisplay = function(place) {
  return this.places[place] / iter;
}

function runSimulation(data, $rootScope) {
  gamesRemaining = data.gamesRemaining;
  
  data.entries.forEach(function(element) {
    entries.push(new Entry(element.name, element.points, data.entries.length));
  });

  for(var i=0; i<iter; i++) {
    simulateSeason();
  }
  
  entries.sort(function(a, b) {
    if(a.places[0] < b.places[0]) return 1;
    if(a.places[0] > b.places[0]) return -1;
    return 0;
  });

  $rootScope.$broadcast('simulation-done', entries);
}

function simulateSeason() {
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

