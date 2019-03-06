const worker = require('./worker')
 module.exports = (app, db) => {
   worker(app, db);
 }
