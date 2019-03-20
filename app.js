const express = require('express')
const bodyParser = require('body-parser')
const auth = require('./app/auth/auth.js')
const path = require('path')
const cors = require('cors')
const table = require('./app/tables/settingProperties')
const persent = require('./app/tables/persents')
const teacher = require('./app/tables/teachers')

const app = express()
const paths = '/api/'
app.use(bodyParser.json())
app.use(cors());
app.use(express.static(path.join(__dirname, "public")))
app.use(paths, auth)
app.use(paths, table)
app.use(paths, persent)
app.use(paths, teacher)

app.listen(3000)