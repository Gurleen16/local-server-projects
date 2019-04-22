var input=document.getElementById("task");
var c1=document.getElementById("c1");
var c2=document.getElementById("c2");
var post=document.getElementById("post");
var get1=document.getElementById("get1");
var get2=document.getElementById("get2");
var ullist=document.getElementById("ullist");
var STATUS_OK = 200;

get1.onclick=function()
{
  var request=new XMLHttpRequest();
  request.addEventListener('load', function()
  {
    if (request.status === 200) {
      var tasks = JSON.parse(request.responseText);
      console.log(tasks);
      tasks.forEach(function(task)
        {
          //console.log(task.text);
          var li = document.createElement('li');
          li.innerHTML=task.text;
          ullist.appendChild(li);
          //console.log("b");

        });
    }
  });
  request.open('GET','/tasks1');
  request.send();
}
get2.onclick=function()
{
  var request=new XMLHttpRequest();
  request.addEventListener('load', function()
  {
    if (request.status === STATUS_OK) {
      var tasks = JSON.parse(request.responseText);
      console.log(tasks);
      tasks.forEach(function(task)
        {
          //console.log(task.text);
          var li = document.createElement('li');
          li.innerHTML=task.text;
          ullist.appendChild(li);
        });
    }
  });
  request.open('GET','/tasks2');
  request.send();
}
post.onclick=function()
{
  if(c1.checked&&!c2.checked)
  {
    var request=new XMLHttpRequest();
    request.addEventListener("load",function()
    {

    });

    request.open('POST', '/tasks1');
    request.send(JSON.stringify({ text: input.value }));
  }
  else if(!c1.checked&&c2.checked)
  {
    var request=new XMLHttpRequest();
    request.addEventListener("load",function()
    {

    });

    request.open('POST', '/tasks2');
    request.send(JSON.stringify({ text: input.value }));
  }

}
