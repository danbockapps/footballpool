var express=require('express');
var app = express();
var root = global.process.env.PWD;
var f = require('./functions.js');

// Regex matches /anyword or /dev/anyword, but not /anyword/anyword
// No trailing slash. Redirect to trailing slash.
app.get(/^(\/dev)?\/\w+$/, function(req, res) {
  res.redirect(global.process.env.REQUEST_URI + '/');
});

// Regex matches /anyword or /dev/anyword, but not /anyword/anyword
// (trailing slash required)
app.get(/^(\/dev)?\/\w+\/$/, function(req, res) {
  f.log(new Date() + ' ' + global.process.env.REMOTE_ADDR);
  res.sendFile(root + '/public/index.html');
});

// Regex matches /anyword/entries or /dev/anyword/entries. Trailing / optional.
app.get(/^(\/dev)?\/\w+\/entries\/?$/, function(req, res) {
  f.getEntries(res);
});

// Regex matches /anyword/static or /dev/anyword/static.
app.use(/^(\/dev)?\/\w+\/static/, express.static(root + '/public'));

app.get(/globalprocess/, function(req, res) {
  var output = '';
  var objectToExamine = global.process.env;
  for (var property in objectToExamine) {
    output += property + ': ' + objectToExamine[property]+';<br />';
  }
  
  res.send(output);
});

var server = app.listen(3000);
