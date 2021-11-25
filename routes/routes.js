const { render } = require('ejs');
const { request, json } = require('express');
var axios = require('axios');
const e = require('express');
var ticketsArr = [];


//request to get tickets body
var request_body = function (callback, error) {

  axios.get(domain, {
    auth: {
      username: username,
      password: password,
    },
  }).then(callback).catch(error);
}

//seperates array in size of 25 for pages
var paginate = function (arr, size) {
  return arr.reduce((acc, val, i) => {
    let idx = Math.floor(i / size);
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
  if(ticketsArr.length == 0){
    res.redirect('/');
  }else{
    //we send the page, the total number of tickets, and the current page the user is on.
    if (page > 0 && (page <= ticketsArr.length)) {
      res.render('home.ejs', { ticketsArr: ticketsArr[page - 1], pages: ticketsArr.length, pageNum: page, message: req.query.message });
    } else {
      var message = "It seems like you tried to enter an invalid query in the URL! You were redirected to the first page.";
      res.status(404).render('home.ejs', { ticketsArr: ticketsArr[0], pages: ticketsArr.length, pageNum: 1, message: message });
    }
  }
  
}


/* GET home page. */
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
      }
      ticketsArr.push(ticket);
    })
    ticketsArr = paginate(ticketsArr, 25);
    pageRes.redirect("/?page=1");
  },(function(){
    if (typeof err.response == 'undefined') {
      message = "Unable to connect to the ZenDesk API";
      pageRes.status(400).render('error.ejs', { message: message });
    } else {
      //unauthenticated
      pageRes.status(401).render('error.ejs', { status: err.response.status, message: JSON.stringify(err.response.data) });
    }
  }));
};


var routes = {
  fetch_tickets: fetch_tickets,
  get_page : get_page
};

module.exports = routes;