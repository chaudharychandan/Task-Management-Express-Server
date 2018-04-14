const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const config = require('./config');

mongoose.connect(config.mongoURI);

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
})
