// app.js
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const db = require('./config/db');
const userController = require('./controllers/userController');
const hobbyController = require('./controllers/hobbyController');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/services',express.static('services')); 

app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/html/index.html');
});

app.get('/register', (req, res) => {
  res.sendFile(__dirname + '/public/html/register.html');
});

app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/public/html/login.html');
});

app.get('/hobby', (req, res) => {
  res.sendFile(__dirname + '/public/html/hobby.html');
});

app.get('/map', (req, res) => {
  res.sendFile(__dirname + '/public/html/map.html');
});

app.get('/check-login', userController.checkLogin);
app.post('/register', userController.register);
app.post('/login', userController.login);
app.post('/hobby', hobbyController.searchHobby);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});