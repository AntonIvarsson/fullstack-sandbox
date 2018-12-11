const loki = require('lokijs');

const db = new loki('db.json');

db.addCollection('todos');

db.saveDatabase();