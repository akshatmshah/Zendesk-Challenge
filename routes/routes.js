var axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

var ticketsArr = [];

//request to get tickets body
var request_body = function (callback, error) {
  var domain = "";
  var username = "";
  var password = "";

  if(("DOMAIN" in process.env && "USERNAME" in process.env && "PASSWORD" in process.env)){
    domain = process.env.DOMAIN;
    username = process.env.USERNAME; 
    password = process.env.PASSWORD;
  }


  axios.get(domain, {
    auth: {
      username: username,
      password: password,
    },
  }).then(callback).catch(error);
}

//seperates array in size of 25 for pages
var paginate = function (arr) {
  return arr.reduce((acc, val, i) => {
    let idx = Math.floor(i / 25);
    let page = acc[idx] || (acc[idx] = []);
    page.push(val);
    return acc;
  }, []);
}

var convert_date = function (iso) {
  var d = new Date(iso);
  d.toLocaleDateString('en-US');
  return d;
}


var get_page = function(req, res){
  var page = req.query.page;
  var message = req.query.message;
  //check if we recieved an error message
    if(ticketsArr.length == 0){
      //always start at the first page in case a user tries to query another if requests not made.
      res.redirect('/');
    }else{
      //we send the page, the total number of tickets, and the current page the user is on.
      if (page > 0 && (page <= ticketsArr.length)) {
        res.render('home.ejs', { ticketsArr: ticketsArr[page - 1], pages: ticketsArr.length, pageNum: page});
      } else {
        //go back to the first page if user tries to go back or forward a page
        var message = "Sorry, the page you requested doesn't seem to exist";
        res.status(404).render('error.ejs', {status: "404", message: message});
      }
    }
}


//this is only called whenever there is no query to load tickets once
var fetch_tickets = function (req, pageRes) {
  request_body((res) => {
    var tickets = res.data.tickets;
    ticketsArr = []
    //we only want the neccesary information and compile it into a dict.
    tickets.forEach(element => {
      var ticket = {
        subject: element.subject,
        opened_by: element.assignee_id,
        created_at: convert_date(element.created_at),
        description: element.description,
        tags: element.tags,
        priority: element.priority,
        type: element.type,
        status: element.status
      }
      ticketsArr.push(ticket);
    })
    //break the array into groups of 25
    ticketsArr = paginate(ticketsArr);
    //go to the first page
    pageRes.redirect("/?page=1");
  },(function(err){
    //if there is no response we can't connect to the API
    if (typeof err.response == 'undefined') {
      message = "Request Timeout: Unable to connect to the ZenDesk API";
      pageRes.status(408).render('error.ejs', {status: "408", message: message});
    } else {
      //unauthenticated 
      pageRes.status(err.response.status).render('error.ejs', {status: err.response.status, message: JSON.stringify(err.response.data)});
    }
  }));
};


var routes = {
  fetch_tickets: fetch_tickets,
  get_page : get_page
};

module.exports = routes;
module.exports.paginate = paginate;