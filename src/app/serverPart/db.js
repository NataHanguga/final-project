const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true });
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'conecting error'));
db.once('open', () => {
  console.log('working db');
})
const kittySchema = new mongoose.Schema({
  name: String
});

const Kitten = mongoose.model('Kitten', kittySchema);
module.exports.db = db
module.exports.Kitten = Kitten

