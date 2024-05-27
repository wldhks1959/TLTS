// app.js
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const db = require('./config/db');
const userController = require('./controllers/userController');
const hobbyController = require('./controllers/hobbyController');
const bcrypt = require('bcrypt');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/services',express.static('services')); 

// session 사용 
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: false, // https 사용 시 true로 변경 
    maxAge: 30 * 60 * 1000 // 세션 유효 기간: 30분
   } 
}));


const loginCheck = (req, res, next) => {
  if (req.session.username) {
    next();
  } else {
    res.send(`<script>alert('로그인부터 해주세요.'); window.location.href = '/login';</script>`);
  }
};

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/html/index.html');
});

app.get('/register', (req, res) => {
  res.sendFile(__dirname + '/public/html/register.html');
});

app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/public/html/login.html');
});

// 로그아웃 핸들러 변경
app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Error destroying session:', err);
      res.sendStatus(500);
    } else {
      res.send('<script>alert("로그아웃 되었습니다."); window.location.href = "/";</script>');
    }
  });
});

app.get('/main', loginCheck,  (req,res) => {
  res.sendFile(__dirname + '/public/html/main.html');
});

app.get('/modify', loginCheck, (req, res) => {
  // 현재 로그인한 사용자의 아이디(username)를 가져옵니다.
  const username = req.session.username;
  
  // 사용자의 아이디로 DB에서 해당 사용자의 정보를 가져옵니다.
  db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
    if (err) {
      console.error('Error fetching user information:', err);
      res.sendStatus(500);
      return;
    }
    res.sendFile(__dirname + '/public/html/modify.html');
    // 결과가 있을 때만 사용자 정보를 클라이언트에게 전송합니다.
    
  });
});

app.get('/get-username', loginCheck, (req, res) => {
  // 현재 로그인한 사용자의 아이디(username)를 가져옵니다.
  const username = req.session.username;

  res.json({ username: username });
});

app.get('/hobby', (req, res) => {
  res.sendFile(__dirname + '/public/html/hobby.html');
});

app.post('/modify', loginCheck, async (req, res) => {
  const { username, password, confirmPassword } = req.body;

  // 입력한 비밀번호와 비밀번호 확인 값이 일치하는지 확인합니다.
  if (password !== confirmPassword) {
    return res.send('<script>alert("새로운 비밀번호와 비밀번호 확인이 일치하지 않습니다."); window.location.href = "/modify";</script>');
  }

  try {
    // 입력한 비밀번호를 해싱합니다.
    const hashedPassword = await bcrypt.hash(password, 10);

    // DB에 저장된 해당 사용자의 비밀번호를 업데이트합니다.
    db.query('UPDATE users SET password = ? WHERE username = ?', [hashedPassword, username], (err, result) => {
      if (err) {
        console.error('Error updating password:', err);
        res.sendStatus(500);
      } else {
        res.send('<script>alert("비밀번호가 성공적으로 변경되었습니다."); window.location.href = "/main";</script>');
      }
    });
  } catch (error) {
    console.error('Error hashing password:', error);
    res.sendStatus(500);
  }
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