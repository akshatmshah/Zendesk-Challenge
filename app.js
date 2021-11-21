   var express = require('express');
   var routes = require('./routes/routes.js');
   var cookieParser = require('cookie-parser');
   
   
   var app = express();
   app.use(express.urlencoded({extended: true}));
   app.use(cookieParser());
   
   app.listen(8080);
   console.log('Server running on port 8080. Now open http://localhost:8080/ in your browser!');