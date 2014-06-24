// web.js
var express = require("express");
var logfmt = require("logfmt");
var sys = require('sys')
var exec = require('child_process').exec;
var Entities = require('html-entities').AllHtmlEntities;
var http = require('http');
var decoder = new (require('string_decoder').StringDecoder)('utf-8')

entities = new Entities();

var app = express();

app.use(logfmt.requestLogger());

var quote = "Calvin: Know what I pray for?  Hobbes: What?  Calvin: The strength to change\n\
            what I can, the inability to accept what I can't, and the incapacity to tell\n\
            the difference.  -- Calvin";

function updateQuote() {
	http.get("http://www.iheartquotes.com/api/v1/random?source=calvin&show_permalink=false&show_source=false", function(res) {

    res.on('data', function (chunk) {
      console.log('BODY: ' + chunk);

      quote = decoder.write(chunk);
    });

  });
};

updateQuote();

app.get('/', function(req, res) {
  // since Slack just wants text, we need to pass back " and ' instead of html special entities.
  console.log(quote);
  console.log('----------');
  console.log('quote is a ' + typeof quote)
  res.send(entities.decode(quote));

  // grab a new quote for the next request
  updateQuote();
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});
