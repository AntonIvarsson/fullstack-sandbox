const express = require('express')
const bodyParser = require("body-parser");
const app = express()

const PORT = 3001

const db = require('./db.js');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// 
//
// 

app.get('/', (req, res) => res.send('Nothing here :)'))

app.get('/todolists', (req, res) => res.send(db.getCollection('todoLists')));

app.post('/todo', (req,res) => {
  const id = req.body.list_id
  const todos = req.body.todos

  if(id == null || todos == null){
    res.sendStatus(500);
    throw Error('Post to todo called with missing parameters');
  }

//
//
//

  const todoList = db.getCollection('todoLists').find({ id: id })

  if(todoList === []){
    res.sendStatus(500);
    throw Error('Post to todo called with invalid id');
  }
  todoList[0].todos = todos;
  db.saveDatabase();
  res.sendStatus(200);
});

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
