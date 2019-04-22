var http = require('http');
var url = require('url');
var fs = require('fs');

function readAndServe(path, contentType, response)
{
  fs.readFile(path, function(error, data) {
    if (error) {
      throw error;
    }

    response.writeHead(200, {'Content-type': contentType});
    response.write(data);
    response.end();
  });
}

function createTask(text, callback,path)
{
  readTasks(function(tasks)
  {
    tasks.push({ text: text });
    writeTasks(tasks, callback,path);
  },path);
}
function writeTasks(tasks, callback,path)
{
  var tasksJSON = JSON.stringify(tasks);
  fs.writeFile(path, tasksJSON, function(error) {
  if (error)
  {
    throw error;
  }

    callback();
  });
}

function readJSONBody(request, callback)
{
  var body = '';
  request.on('data', function(chunk) {
					 body += chunk;
			});

  request.on('end', function() {
					var data = JSON.parse(body);
					callback(data);
		   });
}

function readTasks(callback,path)
{
  fs.readFile(path, function(error, contents)
  {
    if (error)
	  {
      throw error;
    }
    var tasks;
    if (contents.length === 0)
	  {
      tasks = [];
    }
	  else
	  {
      tasks = JSON.parse(contents);
    }
    callback(tasks);
  });
}

http.createServer(function(request, response)
{
  //console.log("b");
  var pathname = url.parse(request.url).pathname;

  if (request.method === "GET")
  {
    if (pathname === "/")
    {
      readAndServe('node.html', 'text/html', response);
    }
    else if (pathname === "/node.js" )
    {
      readAndServe('node.js', 'text/javascript', response);
    }
    else if (pathname === "/tasks1")
    {
      readTasks(function(tasks) {
      response.writeHead(200, {'Content-type': 'application/json'});
      response.write(JSON.stringify(tasks));
      response.end();
      },'tasks1');
    }
    else if (pathname === "/tasks2")
    {
      readTasks(function(tasks) {
      response.writeHead(200, {'Content-type': 'application/json'});
      response.write(JSON.stringify(tasks));
      response.end();
      },'tasks2');
    }
    else
    {
      response.end();
    }
  }
    else if (request.method === "POST")
    {
      if (pathname === "/tasks1")
      {
        readJSONBody(request, function(task)
        {
          createTask(task.text, function() {
            // must wait until task is stored before returning response
            response.end();
          },'tasks1');
        });
      }
      else if (pathname === "/tasks2")
      {
        readJSONBody(request, function(task)
        {
          createTask(task.text, function() {
            // must wait until task is stored before returning response
            response.end();
          },'tasks2');
        });
      }
      else
      {
        response.end();
      }
    }
    else {
      response.end();
    }
}).listen(8000);
