//This makes sure that anonymous user is redirected back to home page.
window.onload= function(){
    if(readCookie("username") == ''|| document.cookie==''){
        window.location.href='/';
}
}

//On clicking a tag it is stored in the HTML5 session variable and retrieved when required.
$('#u_tag li').on('click', function(){
    sessionStorage.selectedTag=($(this).text());
});
//default selection of tag is MISC
$(".dropdown-menu li a")[7].click();


function addTask(){
    // get the credentials from the cookie
    var id = readCookie("hasura_id");
    var auth_token = readCookie("auth_token");
    var task = document.getElementById("u_task").value;
    
    if(task==''){
        alert("task can not be empty!");
        return;
    }
    
    var request = new XMLHttpRequest();
  request.onreadystatechange = function(){
    if(request.readyState === XMLHttpRequest.DONE){
      if(request.status === 200){
        alert('Task Added successfully!');
          //After adding a task successfully the tag has to be reset to default MISC
          $(".dropdown-menu li a")[7].click();
      }else if(request.status === 500){
        alert('something went wrong on the server!');
      }
    }
  };
  request.open('POST', 'http://data.satyamsingh.hasura.me/v1/query',false);
  request.setRequestHeader('Content-Type', 'application/json');
    request.setRequestHeader('Authorization', 'Bearer '+ auth_token);
  request.send(JSON.stringify({type: "insert",args: {table: "Task", objects: [{Task: task,Tag_Name: sessionStorage.selectedTag,User_ID: id}]}}));
}
               
//clear the cookies on logout
function logout(){
    document.cookie = "username=; path=/";
    document.cookie = "auth_token=;path=/";
    document.cookie = "hasura_id=;path=/";
    window.location.href ='/';
}

//returns the value of the property in the cookie
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