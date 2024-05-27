const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const session = require('express-session');
const app = express();
const port = 3000; // Express 서버의 포트 번호로 수정

// MySQL 연결 설정
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '0116',
  database: 'user_db',
  connectTimeout: 5000
});

db.connect((err) => {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + db.threadId);
});

// User 테이블 생성
const createUserTable = `
  CREATE TABLE IF NOT EXISTS users (
    username varchar(30) not null primary key,
    password VARCHAR(200) NOT NULL
  );
`;

db.query(createUserTable, (err, result) => {
  if (err) throw err;
  console.log("User table created or already exists.");
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

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

// 로그인 체크 미들웨어
const loginCheck = (req, res, next) => {
  if (req.session.username) {
    next();
  } else {
    res.send(`<script>alert('로그인부터 해주세요.'); window.location.href = '/login';</script>`);
  }
};

// 라우트 설정
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/html/index.html');
});

app.get('/register', (req, res) => {
  res.sendFile(__dirname + '/public/html/register.html');
});

app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/public/html/login.html');
});

app.get('/hobby', loginCheck, (req, res) => {
  res.sendFile(__dirname + '/public/html/hobby.html');
});
app.get('/main', loginCheck,  (req,res) => {
  res.sendFile(__dirname + '/public/html/main.html');
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

const fs = require('fs');

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

// 로그인 상태 체크 API
app.get('/check-login', (req, res) => {
  if (req.session.username) {
    res.json({ loggedIn: true });
  } else {
    res.json({ loggedIn: false });
  }
});

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = { username, password: hashedPassword };

  db.query('INSERT INTO users SET ?', newUser, (err, result) => {
    if (err) {
      console.log(err);
      res.send(`<script>alert('이미 존재하는 아이디입니다. 다른 아이디를 입력하세요'); window.location.href = '/register';</script>`);
    } else {
      res.send(`<script>alert('회원가입 성공'); window.location.href = '/';</script>`);
    }
  });
});

app.post('/login', (req, res) => {
  const user = {
    username: req.body.username,
    password: req.body.password
  };

  db.query('SELECT password FROM users WHERE username = ?', [user.username], async (err, results) => {
    if (err) {
      console.log(err);
      return res.send('로그인 오류');
    }

    if (results.length > 0) {
      const storedPassword = results[0].password;
      const match = await bcrypt.compare(user.password, storedPassword);

      if (match) {
        req.session.username = user.username; // 세션에 사용자 정보 저장
        return res.send(`<script>alert('로그인 성공'); window.location.href = '/main';</script>`);
      } else {
        return res.send(`<script>alert('비밀번호 불일치.'); window.location.href = '/login';</script>`);
      }
    } else {
      return res.send(`<script>alert('회원을 찾을 수 없음.'); window.location.href = '/login';</script>`);
    }
  });
});

app.post('/hobby', loginCheck, (req, res) => {
  const keywords = req.body.keywords;

  if (!keywords) {
    res.send('키워드를 하나 이상 선택해주세요.');
    return;
  }

  const keywordArray = Array.isArray(keywords) ? keywords : [keywords];

  const conditions = keywordArray.map(keyword => {
    return `(a = ? OR b = ? OR c = ? OR d = ? OR e = ? OR f = ? OR g = ? OR h = ? OR i = ? OR j = ? OR k = ? OR l = ?)`;
  });

  const query = `
    SELECT names FROM hobby
    WHERE ${conditions.join(' AND ')}
  `;

  const queryParams = keywordArray.flatMap(keyword => Array(12).fill(keyword));

  db.query(query, queryParams, (err, results) => {
    if (err) {
      console.log(err);
      res.send('취미 데이터를 불러오는데 실패했습니다.');
    } else {
      if (results.length > 0) {
        const names = results.map(result => result.names).join(', ');
        res.send(`Matching hobby Names: ${names}`);
      } else {
        res.send('일치하는 취미가 없습니다.');
      }
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
