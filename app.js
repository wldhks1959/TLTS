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
app.use('/services', express.static('services'));

app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    maxAge: 30 * 60 * 1000
  }
}));

app.use(bodyParser.json());

const loginCheck = (req, res, next) => {
  if (req.session.user_id) { next(); } 
  else 
  { res.send(`<script>alert('로그인부터 해주세요.'); window.location.href = '/login';</script>`);}
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

app.get('/main', loginCheck, (req, res) => {
  res.sendFile(__dirname + '/public/html/main.html');
});

app.get('/modify', loginCheck, (req, res) => {
  res.sendFile(__dirname + '/public/html/modify.html');
});

app.get('/get-user_id', loginCheck, (req, res) => {
  // 현재 로그인한 사용자의 아이디(user_id)를 가져옵니다.
  const user_id = req.session.user_id;

  res.json({ user_id: user_id });
});

app.get('/hobby', loginCheck, (req, res) => {
  res.sendFile(__dirname + '/public/html/hobby.html');
});

app.post('/modify', loginCheck, userController.modify);

app.get('/map', (req, res) => {
  res.sendFile(__dirname + '/public/html/map.html');
});

app.get('/check-login', userController.checkLogin);
app.post('/register', userController.register);
app.post('/login', userController.login);
app.post('/hobby', loginCheck, hobbyController.searchHobby);

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
  const enumValue = convertToEnum(buttonContent);

  if (enumValue) {
    req.session.clickedButtons.push(enumValue);
    clickedButtonArr[req.session.clickedButtons.length - 1] = enumValue;
  }

  if (req.session.clickedButtons.length === 9) {
    hobbyController.searchHobby(req, res).then(() => {
      res.redirect('/hobby_result');
    }).catch((error) => {
      console.error("Error searching hobby: ", error);
      res.status(500).json({ error: error.message });
    });
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

// app.get('/hobby_result', loginCheck, (req, res) => {
//   if (req.session.clickedButtons && req.session.clickedButtons.length === 9) {
//     res.redirect('/hobby_result_page');
//   } else {
//     res.send('<script>alert("모든 질문에 답변해주세요."); window.location.href = "/hobby";</script>');
//   }
// });

// app.get('/hobby_result_page', loginCheck, (req, res) => {
//   const choices = req.session.clickedButtons;
//   res.sendFile(__dirname + '/public/html/hobby_result.html');
// });
app.get('/get-hobby-results', loginCheck, (req, res) => {
  const hobbies = req.session.hobbyResults;
  if (hobbies) {
    res.json(hobbies);
  } else {
    res.status(404).json({ error: "No hobby results found." });
  }
});


app.get('/hobby_result', loginCheck, (req, res) => {
  res.sendFile(__dirname + '/public/html/hobby_result.html');
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
      return "ANY";
  }
}

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
