const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
  console.log('Time: ', Date.now());
  next();
});

router.get('/',(req, res, next) => {
  res.send('home');
  Kitten.find({}).then((data) => console.log('something', data));
  res.send(data)

});

router.get('/about', (req, res) => {
  res.send('about');
  res.status(200).send('here problem error 200');
});

router.post('/', (req, res) => {
  const kitty = Kitten({name: req.body.name});
  
})

module.exports = router;
