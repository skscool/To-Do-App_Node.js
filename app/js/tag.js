//redirect anonymous users back to the homepage

window.onload=function(){
            if(readCookie("username") == ''|| document.cookie==''){
        window.location.href='/';
    }
}

//save the tag value clicked on in the HTML5 session variable and redirect to the /search page
function searchByTag(obj){
    sessionStorage.tag = obj.innerHTML;
    window.location.href= "/search";
}

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

function logout(){
    document.cookie = "username=; path=/";
    document.cookie = "auth_token=;path=/";
    document.cookie = "hasura_id=;path=/";
    window.location.href ='/';
}