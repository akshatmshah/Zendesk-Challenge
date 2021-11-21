var express = require('express');
var https = require("https");
var router = express.Router();

//info to do GET request
var options = {
  hostname: domain,
  path: "/api/v2/tickets.json",
  method: "GET",
  headers: {
    Authorization: 'Basic ' + Buffer.from(username+":"+password).toString("base64")
 } 
}


var ticket_request = https.get(options, 
                    function (res) {
                        //allows for return data to be readable
                        res.setEncoding('utf8');
                        res.on('data', function (body) {
                        console.log(body);
                      });
                    });


/* GET home page. */
var homepage = router.get('', function(req, res, next) {
  ticket_request;
});

var routes = {
  get_homepage : homepage
}

module.exports = routes;