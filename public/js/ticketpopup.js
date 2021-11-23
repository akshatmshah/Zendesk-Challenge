function addModal(element){
    //this helps get the element that called this function
    var intID = parseInt(element.id);
    //then we use this to obtain appropriate modal 
    var model = document.getElementById('modal ' + intID);
    var html = document.getElementsByTagName('html')[0];
    var modelBackground = document.getElementById('background ' + intID);
    var modelCloseButton = document.getElementById('modal-close ' + intID);

    //this opens the model when clicked and stops scrolling
    model.classList.add('is-active');
    html.classList.add('is-clipped');

    //if the background or x is clicked, we resume to normal.
    modelBackground.addEventListener('click', function(){
        html.classList.remove('is-clipped');
        model.classList.remove('is-active');
    })

    modelCloseButton.addEventListener('click', function(){
        html.classList.remove('is-clipped');
        model.classList.remove('is-active');
    })
}