const loki = require('lokijs');

var db = new loki('db.json', {
	autoload: true,
	autoloadCallback : databaseInitialize,
	autosave: true, 
	autosaveInterval: 1000
});

function databaseInitialize() {
  var todoLists = db.getCollection("todoLists");
  if (todoLists === null) {
    todoLists = db.addCollection("todoLists");
    todoLists.insert([
      {
        id: '0000000001',
        title: 'First List',
        todos: [
          { message: 'First todo of first list', finished: false },
          { message: 'Second todo of first list', finished: true }
        ]
      },
      {
        id: '0000000002',
        title: 'Second List',
        todos: [
          { message: 'First todo of second list', finished: false },
          { message: 'Second todo of second list', finished: true }
        ]
      }
    ]);
  }
}

module.exports = db;