var express = require('express');
var routes = require('./routes/routes.js');
var cookieParser = require('cookie-parser');
var app = express();

app.use(cookieParser());
app.use(express.static('public'));

//homepage route -- linked to homepage in routes.js
app.get("/", function(req, res) {
  if (!req.query.page && !req.query.message){
    routes.fetch_tickets(req, res);
  }else{
    routes.get_page(req, res);
  }
})

// Handling 500 (Internal Server Error)
app.use(function (err, req, res, next) {
  console.log(err);
  message = "Hmmm. It seems something went wrong! Try again."
    + " If this persists, contact a server admin!"
  res.status(500).render('error.ejs', {status: "500", message: message});
})

//Handling 404
app.use(function (req, res, next) {
  var message = "Sorry, the page you requested cannot be found."
    + " Double check to ensure you tried accessing the correct page."
    + " In the meantime, I will send you back to the homepage.";
  res.status(404).render('error.ejs', {status: '404', message: message});
})

console.log('Server running on port 8080. Now open http://localhost:8080/ in your browser!');
module.exports = app.listen(8080);
