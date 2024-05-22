const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const session = require('express-session');
const app = express();
const port = 3000;

// MySQL 연결 설정
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'user_db' // db 이름 설정
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
    username VARCHAR(50) NOT NULL PRIMARY KEY,
    password VARCHAR(200) NOT NULL
  )
`;

db.query(createUserTable, (err, result) => {
  if (err) throw err;
  console.log("User table created or already exists.");
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// session 사용 
app.use(session({
  secret : 'secret-key',
  resave : false,
  saveUninitialized: false,
  cookie: { secure: false } // https 사용 시 true로 변경 
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

// 취미 사이트 
app.get('/hobby', (req,res)=>{
  res.sendFile(__dirname + '/public/html/hobby.html')
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

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
    if (err) {
      console.log(err);
      res.send('로그인 오류');
    } else {
      if (results.length > 0) {
        const foundUser = results[0];
        const match = await bcrypt.compare(password, foundUser.password);
        if (match) {
          res.send(`<script>alert('로그인 성공'); window.location.href = '/';</script>`);
        } else {
          res.send(`<script>alert('비밀번호 불일치.'); window.location.href = '/login';</script>`);
        }
      } else {
        res.send(`<script>alert('회원을 찾을 수 없음.'); window.location.href = '/login';</script>`);
      }
    }
  });
});

// hobby 찾는 함수 
app.post('/hobby', loginCheck, (req, res) => {
  const keywords = req.body.keywords;

  if (!keywords) {
    res.send('키워드를 하나 이상 선택해주세요.');
    return;
  }

  // keywords가 배열이 아닌 경우 배열로 변환
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
