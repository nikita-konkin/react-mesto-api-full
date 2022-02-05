require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const validator = require('validator');
const {
  errors,
} = require('celebrate');
const {
  celebrate,
  Joi,
} = require('celebrate');

const allowedCors = [
  'https://praktikum.tk',
  'http://praktikum.tk',
  'http://localhost:3001',
];

const {
  login,
  createUser,
} = require('./controllers/users');
const auth = require('./middlewares/auth');

const {
  PORT = 3000,
} = process.env;

const app = express();

app.use(function(req, res, next) {

  const {
    origin
  } = req.headers;
  console.log(origin);
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
  }

  next();
});

app.use(function(req, res, next) {
  const DEFAULT_ALLOWED_METHODS = "GET,HEAD,PUT,PATCH,POST,DELETE";
  const requestHeaders = req.headers['access-control-request-headers'];

  const {
    method
  } = req;
  console.log(method);
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();

  }
  next();
});

app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
}, (err, next) => {
  if (err) {
    const e = new Error(err.message);
    e.statusCode = err.code;
    next(e);
  } else {
    console.warn('Connected to MongoDB');
  }
});

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), login);

const validateURL = (value) => {
  if (!validator.isURL(value, {
      require_protocol: true,
    })) {
    throw new Error('Неправильный формат ссылки');
  }
  return value;
};

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(validateURL),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8),
  }),
}), createUser);

app.use(auth);

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));



app.use(errors());
app.use((req, res, next) => {
  const e = new Error('Страница не найдена');
  e.statusCode = 404;
  next(e);
});
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  const message = statusCode === 500 ? 'Server error' : err.message;
  res.status(statusCode).send({
    message,
  });

  next();
});

app.listen(PORT, () => {
  console.error(`App listening on port ${PORT}`);
});
