const { render } = require('ejs');
const { request, json } = require('express');
var express = require('express');
var axios = require('axios');
const e = require('express');


//request to get tickets body
var request_body = function(callback, error){
  axios.get(domain,{
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

var convert_date = function(iso){
  var d = new Date(iso);
  d.toLocaleDateString('en-US');
  return d;
}


/* GET home page. */
var homepage = function(req, pageRes){
  request_body((res)=>{
        var ticketsArr = [];
        var tickets = res.data.tickets;
        //we only want the neccesary information and compile it into a dict.
        tickets.forEach(element => {
          var ticket = {
            subject : element.subject,
            opened_by : element.assignee_id,
            created_at : convert_date(element.created_at),
            description : element.description,
            tags : element.tags,
            priority : element.priority,
          }
          ticketsArr.push(ticket);
        })
          var page = req.query.page;
          var pagedArr = paginate(ticketsArr, 25);
    
          //we send the page, the total number of tickets, and the current page the user is on.
          if(page>0 && (page <= pagedArr.length)){
            
            pageRes.render('home.ejs', {ticketsArr : pagedArr[page-1], pages : pagedArr.length, pageNum : page, message: req.query.message});
          }else{
            if (page == null){
              pageRes.render('home.ejs', {ticketsArr : pagedArr[0], pages : pagedArr.length, pageNum : 1, message: req.query.message});
            }else{
              var message = "It seems like you tried to enter an invalid query in the URL! You were redirected to the first page."
              pageRes.redirect("/?message="+encodeURIComponent(message));
            }
          }
    }, (err)=>{
      pageRes.render('error.ejs', {status: err.response.status, message: JSON.stringify(err.response.data)});
    })
};


var routes = {
  get_homepage : homepage
}

module.exports = routes;