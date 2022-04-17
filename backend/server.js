const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
require("dotenv").config();
const databaseConfig = require('./config/config').database;
const routes = require('./routes/routes');

const app = express();
const port = process.env.PORT || 8000;

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(cors());
app.use('/', routes);

mongoose
  .connect(databaseConfig.stringConnection, {
    useNewUrlParser: true
  })
  .then(() => console.log('DB Connected'))
  .catch((err) => console.log(`DB Error: ${err.message}`));

app.listen(port, () => {
  console.log(`Backend server running on port ${port}`);
});
