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
  saveUninitialized: true, //일단 변경
  cookie: { 
    secure: false, // https 사용 시 true로 변경 
    maxAge: 30 * 60 * 1000 // 세션 유효 기간: 30분
   } 
}));

app.use(bodyParser.json());

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


const questionsAndAnswers = [
  {
    question: "실내 또는 실외 활동을 선호하시나요?",
    button1: "실내",
    button2: "실외",
    button3: "상관없음"
  },
  {
    question: "혼자 또는 여럿이 함께 하는 활동을 선호하시나요?",
    button1: "혼자",
    button2: "같이",
    button3: "상관없음"
  },
  {
    question: "직접 하거나 눈으로만 보는 것을 선호하시나요?",
    button1: "직접하기",
    button2: "눈으로만",
    button3: "상관없음"
  },
  {
    question: "활동 강도를 어떻게 선호하시나요?",
    button1: "가만히",
    button2: "적당히 움직이기",
    button3: "활발하게!",
    button4: "상관없음"
  },
  {
    question: "힐링 또는 불태우는 것을 선호하시나요?",
    button1: "힐링하기",
    button2: "불태우기!",
    button3: "상관없음"
  },
  {
    question: "예약이 필요한 활동을 선호하시나요?",
    button1: "좋아",
    button2: "싫어",
    button3: "상관없음"
  },
  {
    question: "장비가 필요한 활동을 선호하시나요?",
    button1: "좋아",
    button2: "싫어",
    button3: "상관없음"
  },
  {
    question: "자기개발 또는 오락을 선호하시나요?",
    button1: "자기계발",
    button2: "오락",
    button3: "상관없음"
  },
  {
    question: "이색적인 또는 보편적인 활동을 선호하시나요?",
    button1: "이색적인",
    button2: "보편적인",
    button3: "상관없음"
  }
];

app.get('/get-questions-and-answers', (req, res) => {
  res.json(questionsAndAnswers);
});


let clickedButtonArr = [];

app.post('/save-clicked-button', (req, res) => {
  if (!req.session.clickedButtons) {
      req.session.clickedButtons = [];
  }
  const { buttonContent } = req.body;

  // 클라이언트로부터 받은 버튼 내용을 ENUM 값으로 변환
  console.log(buttonContent);
  const enumValue = convertToEnum(buttonContent);

  // 변환된 ENUM 값이 유효한 경우에만 저장
  if (enumValue) {
      req.session.clickedButtons.push(enumValue);
      console.log(enumValue);
      clickedButtonArr[req.session.clickedButtons.length - 1] = enumValue; 
  }

  if (req.session.clickedButtons.length === 9) {
    console.log(clickedButtonArr);
      res.redirect('/html/hobby_result.html');
  } else {
      res.sendStatus(200);
  }
});

app.get('/get-clicked-buttons', (req, res) => {
    if (!req.session.clickedButtons) {
        res.json([]);
    } else {
        res.json(req.session.clickedButtons);
    }
});


function convertToEnum(buttonContent) {
  switch (buttonContent) {
    case "실내":
      return "indoor";
    case "실외":
      return "outdoor";
    case "혼자":
      return "solo";
    case "같이":
      return "multi";
    case "직접하기":
      return "play";
    case "눈으로만":
      return "watch";
    case "가만히":
      return "static";
    case "적당히 움직이기":
      return "normal";
    case "활발하게!":
      return "dynamic";
    case "힐링하기":
      return "healing";
    case "불태우기!":
      return "burning";
    case "좋아":
      return "yes";
    case "싫어":
      return "no";
    case "자기계발":
      return "self development";
    case "오락":
      return "fun";
    case "이색적인":
      return "special";
    case "보편적인":
      return "normal";
    default:
        return "null";
  }
}

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});