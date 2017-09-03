'use strict'

function alerter(text){
    alert(text);
}

function searchUser(item){
    item.href += '/' + document.getElementById('user_search_text').value;
}