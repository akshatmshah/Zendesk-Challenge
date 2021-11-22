const { render } = require('ejs');
const { request, json } = require('express');
var express = require('express');
var axios = require('axios');



//request to get tickets body
var request_body = function(callback){
  axios.get(domain,{
    auth: {
      username: username,
      password: password,
    },
  }).then(callback);
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


/* GET home page. */
var homepage = function(req, res){
  request_body((req)=>{
    var tickets = req.data.tickets;
    var ticketsArr = [];
    //we only want the neccesary information and compile it into a dict.
    tickets.forEach(element => {
      console.log(element);
      var ticket = {
        subject : element.subject,
        opened_by : element.assignee_id,
        created_at : element.created_at,
        description : element.description,
        tags : element.tags
      }
      ticketsArr.push(ticket);
    })
      //we send the page, the total number of tickets, and the current page the user is on.
      res.render('home.ejs', {ticketsArr : paginate(ticketsArr, 25), count : req.data.count, pageNum : 0})
  })
};



var routes = {
  get_homepage : homepage
}

module.exports = routes;