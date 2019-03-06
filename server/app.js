const express = require('express');
const bodyParser = require('body-parser');
const auth = require('./app/auth/auth.js');
const path = require('path');
// const todo = require('./app/todo/todoRoute');
const table = require('./app/tables/table');
const persent = require('./app/tables/persents');
const teacher = require('./app/tables/teachers');

const app = express();
const paths = 'https://api/';
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(paths, auth);
// app.use('/api/', todo);
app.use(paths, table);
app.use(paths, persent);
app.use(paths, teacher);


app.listen(3000);