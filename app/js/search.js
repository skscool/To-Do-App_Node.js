//on onloading window refresh to do task and done task

window.onload = function(){
   if(readCookie("username") == ''|| document.cookie==''){
        window.location.href='/';
    }
 loadToDoTask();
 loadDoneTask();
 document.getElementById("thingsTODO").innerHTML = '<h2>Things To Do in '+sessionStorage.tag+'...</h2>';
 document.getElementById("thingsDone").innerHTML = '<h2>Things Done in '+sessionStorage.tag+'...</h2>';
}

function loadToDoTask(){
    var auth_token = readCookie("auth_token");
    var request = new XMLHttpRequest();
    request.onreadystatechange = function(){
        if(request.readyState === XMLHttpRequest.DONE){
            if(request.status === 200){
                var tasks = request.responseText;
                tasks = JSON.parse(tasks);
                var list = '';
                for(var i=0; i<tasks.length;i++){
                    list += '<li onclick="markAsDone(this)">'+ JSON.stringify(tasks[i].Task).replace(/\"/g, "") + '</li>';
                }
                var taskList = document.getElementById("toDoTaskList");
                taskList.innerHTML = list;
            }
        }
    }
    request.open('POST','http://data.c100.hasura.me/v1/query',true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.setRequestHeader('Authorization', 'Bearer '+ auth_token);
    request.send(JSON.stringify({type: "select",args: {table: "Task", columns: ["Task","Time"],where: {Done: "0",Tag_Name: sessionStorage.tag}, order_by: "-Time"}}));
}

function loadDoneTask(){
    var auth_token = readCookie("auth_token");
    var request2 = new XMLHttpRequest();
    request2.onreadystatechange = function(){
        if(request2.readyState === XMLHttpRequest.DONE){
            if(request2.status === 200){
                var tasks = request2.responseText;
                tasks = JSON.parse(tasks);
                var list = '';
                for(var i=0; i<tasks.length;i++){
                    list += '<li onclick="deleteTask(this)">' + JSON.stringify(tasks[i].Task).replace(/\"/g, "") + '</li>';
                }
                var taskList = document.getElementById("doneTaskList");
                taskList.innerHTML = list;
            }
        }
    }
    request2.open('POST','http://data.c100.hasura.me/v1/query',true);
    request2.setRequestHeader('Content-Type', 'application/json');
    request2.setRequestHeader('Authorization', 'Bearer '+ auth_token);
    request2.send(JSON.stringify({type: "select",args: {table: "Task", columns: ["Task","Time"],where: {Done: "1",Tag_Name: sessionStorage.tag}, order_by: "-Time"}}));
}


function markAsDone(obj){
    var task = obj.innerHTML;
    
    var auth_token = readCookie("auth_token");
    var request3 = new XMLHttpRequest();
    request3.onreadystatechange = function(){
        if(request3.readyState === XMLHttpRequest.DONE){
            if(request3.status === 200){
                loadDoneTask();
                loadToDoTask();
                }
            }
        }
    request3.open('POST','http://data.c100.hasura.me/v1/query',true);
    request3.setRequestHeader('Content-Type', 'application/json');
    request3.setRequestHeader('Authorization', 'Bearer '+ auth_token);
    request3.send(JSON.stringify({type: "update",args: {table: "Task", $set: {Done: "1"},where: {Task: task}}}));
}

//delete by task
function deleteTask(obj){
    var task = obj.innerHTML;
    
    var auth_token = readCookie("auth_token");
    var request4 = new XMLHttpRequest();
    request4.onreadystatechange = function(){
        if(request4.readyState === XMLHttpRequest.DONE){
            if(request3.status === 200){
                }
            }
        }
    request4.open('POST','http://data.c100.hasura.me/v1/query',false);
    request4.setRequestHeader('Content-Type', 'application/json');
    request4.setRequestHeader('Authorization', 'Bearer '+ auth_token);
    request4.send(JSON.stringify({type: "delete",args: {table: "Task", where: {Task: task}}}));
    loadDoneTask();
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