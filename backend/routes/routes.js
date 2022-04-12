const app = module.exports = require('express')();
const planetRoute = require('./planetRoute');

app.get('/', (err,res) => {
  return res.json({ message: 'All set!' });
});

app.use('/planet', planetRoute);