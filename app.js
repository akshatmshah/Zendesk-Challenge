var express = require('express');
var routes = require('./routes/routes.js');
var cookieParser = require('cookie-parser');
var app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());
app.use(express.static('public'));

//homepage route -- linked to homepage in routes.js
app.get("/", function(req, res) {
  if (!req.query.page && !req.query.message){
    console.log("query for page " + req.query.page + ".");
    console.log("go to tickets");
    routes.fetch_tickets(req, res);
  }else{
    console.log("Message query: " + req.query.message);
    console.log("go to pages: " + JSON.stringify(req.query.page) + ".");
    routes.get_page(req, res);
  }
})

// Handling 500 (Internal Server Error)
app.use(function (err, req, res, next) {
  message = "Hmmm. It seems something went wrong! Try again."
    + " If this persists, contact a server admin!"
  res.status(500).send(message);
})

//Handling 404
app.use(function (req, res, next) {
  var message = "Sorry, the page you requested cannot be found."
    + " Double check to ensure you tried accessing the correct page."
    + " In the meantime, I will send you back to the homepage.";
  res.status(404).redirect("/?message=" + encodeURIComponent(message));
})

app.listen(8080);
console.log('Server running on port 8080. Now open http://localhost:8080/ in your browser!');