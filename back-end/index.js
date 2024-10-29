const express = require('express');
const db = require('./db/db');
const Project = require('./db/models/project-schema');
const Todo = require('./db/models/todo-schema');

const app = express();

app.listen(8001, () => {
  console.log('app is running at http://localhost:8001');
});
