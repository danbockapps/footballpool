var fs = require('fs');
var exec = require('child_process').exec;

module.exports = {
  log: log,

  getEntries: function(res) {
    exec('./curl.sh', function(error, stdout, stderr) {
      res.json(remainingEntries(stdout));
    });
  }
};

function Entry(teamName, points) {
  this.teamName = teamName;
  this.points = points;
}

function log(string) {
  fs.appendFileSync('../log.txt', string + '\n');
}

function remainingEntries(html) {
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
    remainingEntries(html.substr(pointsStart + pointsLen)));
}