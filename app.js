const express = require('express')
const bodyParser = require('body-parser')
const auth = require('./app/auth/auth.js')
const path = require('path')
const cors = require('cors')
const table = require('./app/tables/settingProperties')
const persent = require('./app/tables/persents')
const teacher = require('./app/tables/teachers')
const saveDoc = require('./app/tables/saveDocuments')

const app = express()
const paths = '/api/'
app.use(bodyParser.json())
app.use(cors());
app.use(express.static(path.join(__dirname, "public")))
app.use(function (req, res, next) {
    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });
app.use(paths, auth)
app.use(paths, table)
app.use(paths, persent)
app.use(paths, teacher)
app.use(paths, saveDoc)

app.listen(3000)