window.onload= function(){
    if(readCookie("username") == ''|| document.cookie==''){
        window.location.href='/';
}
}

$('#u_tag li').on('click', function(){
    sessionStorage.selectedTag=($(this).text());
});
$(".dropdown-menu li a")[7].click();


function addTask(){
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
          alert(request.responseText);
          $(".dropdown-menu li a")[7].click();
      }else if(request.status === 403){
        alert('username/password incorrect');
      }else if(request.status === 500){
        alert('something went wrong on the server!');
      }
    }
  };
  request.open('POST', 'http://data.c100.hasura.me/v1/query',false);
  request.setRequestHeader('Content-Type', 'application/json');
    request.setRequestHeader('Authorization', 'Bearer '+ auth_token);
  request.send(JSON.stringify({type: "insert",args: {table: "Task", objects: [{Task: task,Tag_Name: sessionStorage.selectedTag,User_ID: id}]}}));
}
                
function logout(){
    document.cookie = "username=; path=/";
    document.cookie = "auth_token=;path=/";
    document.cookie = "hasura_id=;path=/";
    window.location.href ='/';
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