const express = require('express'),
    // path = require('path'),
    bodyParser = require('body-parser'),
    // cors = require('cors'),
    mongoose = require('mongoose');
const router = require('./ss');
const db = require('./db');
const app = express();
app.set('view engine', 'ejs');
app.use('/', router);
app.listen(3000);
