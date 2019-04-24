var input=document.getElementById('input');
var post=document.getElementById('post');
var get=document.getElementById('get');
var divlist=document.getElementById('divlist');
var ollist=document.getElementById('ollist');
var products=[];
post.onclick=function(){
  var xhttp=new XMLHttpRequest();
  xhttp.onreadystatechange=function() {
    //if (this.readyState == 4 && this.status == 200) {
      //document.getElementById("").innerHTML = this.responseText;
    }

  xhttp.open("POST", "/addProduct");
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.send(JSON.stringify({'name':input.value}));
}

get.onclick=function()
{
  ollist.innerHTML="";
  var xhttp=new XMLHttpRequest();
  xhttp.addEventListener("load",function()
  {
    console.log(xhttp.responseText);
    products=JSON.parse(xhttp.responseText);
    var len=products.length;
    var i=0;
    while(i<len)
    {
      var item=products[i].productName;
      console.log(item);
      var li=document.createElement("li");
      li.innerHTML=item+" ";
      var dlt=document.createElement("button");
      dlt.setAttribute("id",i);
      dlt.innerHTML='X';
      dlt.addEventListener("click" , function(dl)
      {
        xhttp.open("POST", "/deleteProduct");
        xhttp.setRequestHeader("Content-Type" , "application/json");
        var index = dl.target.id;
        //console.log(index);
        //console.log(products[index]);
        xhttp.send(JSON.stringify({'productName' : products[index].productName}));
        dl.target.parentNode.parentNode.removeChild(dl.target.parentNode);
      });
      li.appendChild(dlt);
      ollist.appendChild(li);
      divlist.appendChild(ollist);
      i++;
    }
  });
  xhttp.open("GET", "/products");
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.send();

}
