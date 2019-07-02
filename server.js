var express = require('express');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

var Storage = {
  add: function(name) {
    var item = {name: name, id: this.setId};
    this.items.push(item);
    this.setId += 1;
    return item;
  }, 
  delete: function(id) {
	  var item = {id: this.setId};
	for(var i=0;i < this.items.length;i++){
		if (this.items[i] && this.items[i].id == id){
			delete this.items[i];
			return i;
		}
	}	  
  },
  put: function(id,name){
	 
	  for(var i=0;i < this.items.length;i++){
		if (this.items[i] && this.items[i].id == id){
			this.items[i].name = name;
			return i;
		}
	}	  
	  
  }
};

var createStorage = function() {
  var storage = Object.create(Storage);
  storage.items = [];
  storage.setId = 1;
  return storage;
}

var storage = createStorage();

storage.add('Broad beans');
storage.add('Tomatoes');
storage.add('Peppers');

var app = express();
app.use(express.static('public'));

app.get('/items', function(request, response) {
	console.log(storage.items);
    response.json(storage.items);
});

app.post('/items', jsonParser, function(request, response) {
    if (!('name' in request.body)) {
        return response.sendStatus(400);
    }

    var item = storage.add(request.body.name);
    response.status(201).json(item);
});

app.delete('/items/:id', jsonParser, function(request, response) {
	if (!('id' in request.params)){
		return response.sendStatus(400);
	}
	var item = storage.delete(request.params.id);
	
	if(item)return response.sendStatus(200);
	else return response.sendStatus(404);
	
	response.status(201).json(item);
	
	
});
app.put('/items/:id', jsonParser, function(request, response) {
	if (!('id' in request.params)){
		return response.sendStatus(400);
	}
	if (!('name' in request.body)){
		return response.sendStatus(400);
	}
	
	var item = storage.put(request.params.id, request.body.name);
	if(item)return response.sendStatus(200)
		else return response.sendStatus(404);
	
});
app.listen(process.env.PORT || 8080, process.env.IP);