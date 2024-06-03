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
  if (req.session.user_id) { next(); } 
  else 
  { res.send(`<script>alert('로그인부터 해주세요.'); window.location.href = '/login';</script>`);}
};

const adminCheck = (req, res, next) => {
  if (req.session.is_admin) {
    next();
  } else {
    res.send(`<script>alert('관리자만 접근 가능합니다.'); window.location.href = '/main';</script>`);
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

app.get('/main', loginCheck, (req, res) => {
  res.sendFile(__dirname + '/public/html/main.html');
});

app.get('/get-main-hobbies', (req, res) => {
  const hobbies = [
    { hobby_id: "가라데", image_path: "/images/hobby_img/가라데.webp" },
    { hobby_id: "드라이브", image_path: "/images/hobby_img/드라이브.webp" },
    { hobby_id: "목공예", image_path: "/images/hobby_img/목공예.webp" },
    { hobby_id: "사격", image_path: "/images/hobby_img/사격.webp" },
    { hobby_id: "수상스키", image_path: "/images/hobby_img/수상스키.webp" },
    { hobby_id: "요가", image_path: "/images/hobby_img/요가.webp" }
  ];
  res.json(hobbies);
});

app.get('/modify', loginCheck, (req, res) => {
  res.sendFile(__dirname + '/public/html/modify.html');
});

app.get('/get-user_id', loginCheck, (req, res) => {
  // 현재 로그인한 사용자의 아이디(user_id)를 가져옵니다.
  const user_id = req.session.user_id;

  res.json({ user_id: user_id });
});

app.get('/hobby', (req, res) => {
  res.sendFile(__dirname + '/public/html/hobby.html');
});

// 추가한 부분 시작 -----------------------
app.get('/admin', loginCheck, adminCheck, (req, res) => {
  res.sendFile(__dirname + '/public/html/admin.html');
});

app.get('/userinfoList.html', loginCheck, adminCheck, (req, res) => {
  res.sendFile(__dirname + '/public/html/userinfoList.html');
});

app.get('/hobbiesList.html', loginCheck, adminCheck, (req, res) => {
  res.sendFile(__dirname + '/public/html/hobbiesList.html');
});

app.get('/hobbies', loginCheck, (req, res) => {
  const query = `SELECT * FROM hobbies`;

  db.query(query, (err, results) => {
      if (err) {
          console.error('Error fetching hobbies:', err);
          res.status(500).json({ error: 'Database error' });
      } else {
          res.status(200).json(results);
      }
  });
});

app.get('/getHobbyKeywords', loginCheck, (req, res) => {
  const query = `SHOW COLUMNS FROM hobbies`;

  db.query(query, (err, results) => {
      if (err) {
          console.error('Error fetching columns:', err);
          res.status(500).json({ error: 'Database error' });
      } else {
          res.status(200).json(results);
      }
  });
});

app.get('/getHobbyKeywords', loginCheck, hobbyController.getHobbyKeywords);

// 봉인.
// app.post('/addHobbyKeyword', loginCheck, hobbyController.addHobbyKeyword);
app.post('/addHobby', loginCheck, hobbyController.addHobby);
app.put('/updateHobby', loginCheck, hobbyController.updateHobby);

app.get('/users', loginCheck, userController.getAllUsers);
// 추가한 부분 끝 -------------------------

app.post('/modify', loginCheck, userController.modify);

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

app.post('/reset-answers', (req, res) => {
  req.session.clickedButtons = [];
  res.sendStatus(200);
});


app.get('/get-questions-and-answers', (req, res) => {
  res.json(questionsAndAnswers);
});

app.post('/save-clicked-button', (req, res) => {
  if (!req.session.clickedButtons) {
    req.session.clickedButtons = [];
  }
  const { buttonContent } = req.body;
  const enumValue = convertToEnum(buttonContent);

  if (enumValue) {
    req.session.clickedButtons.push(enumValue);
    console.log(req.session.clickedButtons);
  }

  res.sendStatus(200);
});


const getRecommendations = (choices, callback) => {
  let allResults = [];
  let excludedHobbies = [];

  const queryWithConditions = (remainingConditions, callback) => {
    if (remainingConditions === 0 || allResults.length >= 9) {
      callback(null, allResults.slice(0, 9));
      return;
    }
    console.log(remainingConditions);

    const conditions = choices.slice(0, remainingConditions).map((choice, index) => `h.${getColumnName(index)} = ?`).join(' AND ');
    const exclusionCondition = excludedHobbies.length > 0 ? `AND h.hobby_id NOT IN (${excludedHobbies.map(() => '?').join(', ')})` : '';
    const query = `
    SELECT h.hobby_id, h.hobby_place, hi.image_path,
      ${remainingConditions} AS satisfied_conditions
      FROM hobbies h
      JOIN hobbiesimage hi ON h.hobby_id = hi.hobby_id
      ${conditions ? `WHERE ${conditions} ${exclusionCondition}` : exclusionCondition}
      LIMIT ${9 - allResults.length}`;

    const params = [...choices.slice(0, remainingConditions), ...excludedHobbies];
    
    db.query(query, params, (err, results) => {
      if (err) {
        callback(err, null);
        return;
      }
      console.log(results);
      allResults.push(...results.map(result => ({
         hobby_id: result.hobby_id,
         image_path: result.image_path,
         hobby_place : result.hobby_place,
         satisfied_conditions: (remainingConditions / 9) * 100 // Convert to percentage
       })));
      excludedHobbies.push(...results.map(result => result.hobby_id));
      queryWithConditions(remainingConditions - 1, callback);
    });
  };

  queryWithConditions(choices.length, callback);
};

const getColumnName = (index) => {
  const columns = ['I_O', 'S_M', 'P_W', 'MV', 'H_B', 'RESV', 'EQUIP', 'SD_F', 'NORM'];
  return columns[index];
};

app.get('/get-recommendations', (req, res) => {
  if (!req.session.clickedButtons) {
    return res.json([]);
  }

  const choices = req.session.clickedButtons;

  getRecommendations(choices, (err, results) => {
    if (err) {
      console.error('Database query error: ', err);
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
  });
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