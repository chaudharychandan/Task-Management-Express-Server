const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const cookieSession = require('cookie-session');

require('./middlewares/passport');
const { session } = require('./config/keys');

const config = require('./config');
const routes = require('./routes');

mongoose.connect(config.mongoURI);

const app = express();
app.use(bodyParser.json());
app.use(cors({
  credentials: true,
  origin: function(origin, callback) {
    callback(null, true);
  }
}));
app.use(cookieSession({
  name: 'session',
  maxAge: 24 * 60 * 60 * 1000,
  keys: [session.cookieKey]
}));

app.use(passport.initialize());
app.use(passport.session());

routes(app);

app.use((err, req, res, next) => {
  res.status(422).send({ error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
})
