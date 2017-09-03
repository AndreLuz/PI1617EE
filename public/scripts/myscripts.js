'use strict';

function alerter(text) {
    alert(text);
}

function searchUser(item) {
    item.href += '/' + document.getElementById('user_search_text').value;
}

function addFavourite(item, movie) {
    var xhttp;
    if (window.XMLHttpRequest) {
        // code for modern browsers
        xhttp = new XMLHttpRequest();
    } else {
        // code for old IE browsers
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200)
        {
            document.getElementById(item.id).disabled = true;
        }
    };
    xhttp.open("post","/favourite/add", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify({movie: movie}));
}

function removeFavourite(movie_id) {
    var xhttp;
    if (window.XMLHttpRequest) {
        // code for modern browsers
        xhttp = new XMLHttpRequest();
    } else {
        // code for old IE browsers
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200)
        {
            let it = document.getElementById('remove').parentNode;
            while(it.hasChildNodes())
                it.removeChild(it.firstChild);
        }
    };
    xhttp.open("post","/favourite/remove", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify({ movie_id: movie_id }));
}

function postComment(item, movie_id)
{
    var comment = document.getElementsByName("commentBox")[0].value;
    var xhttp
    if (window.XMLHttpRequest) {
        // code for modern browsers
        xhttp = new XMLHttpRequest();
    } else {
        // code for old IE browsers
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200)
        {
            document.getElementById("commentsdiv").innerHTML = this.responseText
        }
    }
    xhttp.open("post","/comment/add", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify({comment: comment, movie_id: movie_id}))
}