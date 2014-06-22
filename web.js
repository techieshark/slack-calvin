// web.js
var express = require("express");
var logfmt = require("logfmt");
var sys = require('sys')
var exec = require('child_process').exec;
var Entities = require('html-entities').AllHtmlEntities;

entities = new Entities();

var app = express();

app.use(logfmt.requestLogger());

app.get('/', function(req, res) {

	function puts(error, stdout, stderr) {
		// since Slack just wants text, we need to pass back " and ' instead of html special entities. 
		res.send(entities.decode(stdout));
	}

  exec('curl "http://www.iheartquotes.com/api/v1/random?source=calvin&show_permalink=false&show_source=false"', puts);

});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});