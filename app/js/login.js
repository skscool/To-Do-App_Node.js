window.onload = function(){
        if(readCookie("username") != ''&& document.cookie !=''){
        window.location.href='/task';
    }
}

/* Take username and password from text field and on button click a XMLHttpRequest (POST) is created to login.
Cookies are set to the value of the username, auth_token and hasura_id returned as response to the request. */

function loginUser(){
    //take username and password value from text field
    var username = document.getElementById("u_username").value;
    var pass = document.getElementById("u_pass").value;
    var serverResponseJSON;
    alert("hey");
    
    //make POST request to login with username and password
    var request = new XMLHttpRequest();
  request.onreadystatechange = function(){
    if(request.readyState === XMLHttpRequest.DONE){
      if(request.status === 200){
        alert('logged in successfully!');
          alert(request.responseText);
          serverResponseJSON = JSON.parse(request.responseText);
      }else if(request.status === 403){
        alert('username/password incorrect');
      }else if(request.status === 500){
        alert('something went wrong on the server!');
      }
    }
  };
    
  request.open('POST', 'http://auth.satyamsingh.hasura.me/login',false);
  request.setRequestHeader('Content-Type', 'application/json');
  request.send(JSON.stringify({username: username, password: pass}));

    //save username auth_token and hasura_id to cookie
    document.cookie = "username="+username+"; path=/";
    document.cookie = "auth_token="+serverResponseJSON.auth_token+";path=/";
    document.cookie = "hasura_id="+serverResponseJSON.hasura_id+";path=/";
    
    alert(document.cookie);
    window.location.href='/task';
    
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
