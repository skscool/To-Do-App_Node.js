//if an entry is there for the username property that means user is logged in >> redirect to /task page
window.onload = function(){
        if(readCookie("username") != '' && document.cookie !=''){
        window.location.href='/task';   
        }
    }

//return the value of the property requested from the cookies.
function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
    }