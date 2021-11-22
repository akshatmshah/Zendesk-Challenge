   var express = require('express');
   var routes = require('./routes/routes.js');
   var cookieParser = require('cookie-parser');
   
   
   var app = express();
   app.use(express.urlencoded({extended: true}));
   app.use(cookieParser());
   app.use(express.json());
   app.use(express.static('public'));



   //homepage route -- linked to homepage in routes.js
   app.get("/",routes.get_homepage);
   
   app.listen(8080);
   console.log('Server running on port 8080. Now open http://localhost:8080/ in your browser!');