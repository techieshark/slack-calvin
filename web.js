// web.js
var express = require("express");
var logfmt = require("logfmt");
var sys = require('sys')
var exec = require('child_process').exec;
var Entities = require('html-entities').AllHtmlEntities;

entities = new Entities();

var app = express();

app.use(logfmt.requestLogger());

// sample = "\
// 	MOM, CAN I SET FIRE TO MY BED MATTRESS?&quot; &quot;No, Calvin.&quot; &quot;CAN I RIDE MY\
// TRICYCLE ON THE ROOF? &quot;No, Calvin.&quot; &quot;Then can I have a cookie?&quot; &quot;No, Calvin.&quot;\
// (She's on to me.&quot;)\
// ";

// function puts(error, stdout, stderr) { 
// 	sys.puts(stdout);
// 	sys.puts("--------");
// 	sys.puts(stdout.replace(/&quot;/g,'"')); 
// }

//exec('curl "http://www.iheartquotes.com/api/v1/random?source=calvin&show_permalink=false&show_source=false" | sed -e "s/&quot;/\"/', puts);
// puts(null, sample, null);

app.get('/', function(req, res) {

	function puts(error, stdout, stderr) {
		// since Slack just wants text, we need to pass back " and ' instead of html special entities. 
		res.send(entities.decode(stdout)); //.replace(/&[rl]*[d]*quo[t]*;/g, '"').replace(/&[rl]squo;/g, "'"
	}

  exec('curl "http://www.iheartquotes.com/api/v1/random?source=calvin&show_permalink=false&show_source=false" | sed -e "s/&quot;/\"/', puts);

});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});