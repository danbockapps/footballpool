var fs = require('fs');
var util = require('util');

module.exports = {
  log: function(string) {
    fs.appendFileSync('../log.txt', string + '\n');
  }
};
