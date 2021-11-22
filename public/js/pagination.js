var page = parseInt(JSON.parse($('#currentPage').text()));
$('#currentPage').remove();


$(document).ready(function() {
    //add href with updated id to prev and next button
    var prev = document.getElementsByClassName("pagination-previous")[0];
    var next = document.getElementsByClassName("pagination-next")[0];
    var nextid = parseInt(page) + 1;
    var previd = parseInt(page) - 1;
    prev.href = "/?page="+previd;
    next.href = "/?page="+nextid;
});