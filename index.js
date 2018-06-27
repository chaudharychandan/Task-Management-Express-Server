const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const config = require('./config');
const routes = require('./routes');

mongoose.connect(config.mongoURI);

const app = express();
app.use(bodyParser.json());
app.use(cors());

routes(app);

app.use((err, req, res, next) => {
  res.status(422).send({ error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
})
