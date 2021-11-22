$(document).ready(() => {
    var tileArr = document.getElementsByClassName("tile");
    var modalArr = document.getElementsByClassName("modal");
    var backgroundModalsArr = document.getElementsByClassName('modal-background');
    var modelCloseArr = document.getElementsByClassName('modal-close');
    for(var i = 0; i < modalArr.length; i++){
            var currClasses = modalArr[i].classList;

            tileArr[i].addEventListener('click', function(){
                currClasses.toggle('is-active');
                $('html').toggleClass('is-clipped');
            })
            backgroundModalsArr[i].addEventListener('click', function(){
                currClasses.toggle('is-active');
                $('html').toggleClass('is-clipped');
            })
            modelCloseArr[i].addEventListener('click', function(){
                currClasses.toggle('is-active');
                $('html').toggleClass('is-clipped');
            })
    }
 });