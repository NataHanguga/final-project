module.exports  = (app, db) => {
  app.post('/', (req, res) => {
    res.send('Hello');
  })
};
