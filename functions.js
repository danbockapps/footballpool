var fs = require('fs');
var config = require('./config');
var exec = require('child_process').exec;

module.exports = {
  log: log,

  getEntries: function(res) {
    exec('./curl.sh', function(error, stdout, stderr) {
      res.json({
        gamesRemaining: gamesRemaining(stdout),
        entries: parseEntries(stdout)
      });
    });
  }
};

function Entry(name, points) {
  this.name = name;
  this.points = points;
}

function log(string) {
  fs.appendFileSync('../log.txt', string + '\n');
}

function gamesRemaining(html) {
  var recStart = html.search(/\d+-\d+<\/td>/);
  var recLen = html.substr(recStart).search(/<\/td>/);
  var recString = html.substr(recStart, recLen)
  
  var wins = recString.substr(0, recString.indexOf('-'));
  var losses = recString.substr(recString.indexOf('-') + 1);
  return 267 - (Number(wins) + Number(losses)) - config.pushesSoFar;
}

function parseEntries(html) {
  var spanPos = html.indexOf('<span class="team-name">');
  
  if(spanPos === -1) {
    // No entries in html. This is the end of the recursive line.
    return [];
  }
  
  var nameStart = spanPos + 24;
  var nameEnd = html.indexOf('</span>')
  var name = html.substr(nameStart, nameEnd - nameStart);
  
  var pointsStart = html.indexOf('<td class="totalpoints ">') + 25;
  var pointsLen = html.substr(pointsStart).search(/\d<\/td>/);
  var points = html.substr(pointsStart, pointsLen + 1);
  
  return [new Entry(name, Number(points))].concat(
    parseEntries(html.substr(pointsStart + pointsLen)));
}
