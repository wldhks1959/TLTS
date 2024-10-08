// app.js
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path'); // path 모듈 임포트 추가

const userController = require('./controllers/userController');
const hobbyController = require('./controllers/hobbyController');

const userService = require('./services/userService');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use('/services', express.static('services')); 
app.use('/controllers', express.static('controllers')); 
app.use('/repo', express.static(__dirname + '/repo'));

// session 사용 
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { 
    secure: false, // https 사용 시 true로 변경 
    maxAge: 30 * 60 * 1000 // 세션 유효 기간: 30분
  } 
}));

// 리팩토링 시작

// Routes
// 시작
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'html', 'index.html')));
app.get('/register', (req, res) => res.sendFile(path.join(__dirname, 'public', 'html', 'register.html')));
app.get('/login', (req, res) => res.sendFile(path.join(__dirname, 'public', 'html', 'login.html')));
app.get('/get-main-hobbies', hobbyController.getMainHobbies);

// 로그인 이후
app.get('/main',  (req, res) => res.sendFile(path.join(__dirname, 'public', 'html', 'main.html')));
app.get('/modify', userService.loginCheck, (req, res) => res.sendFile(path.join(__dirname, 'public', 'html', 'modify.html')));
app.get('/get-user_id', userService.loginCheck, userController.getUserId);
app.get('/hobby', (req, res) => res.sendFile(path.join(__dirname, 'public', 'html', 'hobby.html')));

// 관리자 페이지
app.get('/admin', userService.loginCheck, userService.adminCheck, (req, res) => res.sendFile(path.join(__dirname, 'public', 'html', 'adminmain.html')));
app.get('/admin/userinfoList', userService.loginCheck, userService.adminCheck, (req, res) => res.sendFile(path.join(__dirname, 'public', 'html', 'userinfoList.html')));
app.get('/admin/hobbiesList', userService.loginCheck, userService.adminCheck, (req, res) => res.sendFile(path.join(__dirname, 'public', 'html', 'hobbiesList.html')));

// 기능 불러오기.
app.get('/map', (req, res) => res.sendFile(path.join(__dirname, 'public', 'html', 'map.html')));
app.get('/hobbies', userService.loginCheck, hobbyController.getHobbies);

app.get('/check-login', userController.checkLogin);
app.post('/register', userController.register);
app.post('/login', userController.login);
app.post('/modify', userService.loginCheck, userController.modify);
app.get('/users', userService.loginCheck, userController.getAllUsers);

app.get('/get-questions-and-answers', (req, res) => {
  const questionsAndAnswers = [
    { question: "어디서 취미를 즐기는 게 좋으신가요?", button1: "실내", button2: "실외", button3: "상관없음" },
    { question: "누구와 함께 하는 것을 좋아하시나요?", button1: "혼자", button2: "같이", button3: "상관없음" },
    { question: "직접 즐기기 vs 보면서 즐기기", button1: "직접하기", button2: "눈으로만", button3: "상관없음" },
    { question: "직접 즐긴다면 얼마나 활발하게?", button1: "가만히", button2: "적당히 움직이기", button3: "활발하게!", button4: "상관없음" },
    { question: "healing vs burning!", button1: "힐링하기", button2: "불태우기!", button3: "상관없음" },
    { question: "예약이 필요한 취미를 좋아하시나요?", button1: "좋아", button2: "싫어", button3: "상관없음" },
    { question: "장비가 필요한 활동을 선호하시나요?", button1: "좋아", button2: "싫어", button3: "상관없음" },
    { question: "취미를 놀이로만 즐기고 싶으신가요?", button1: "자기계발", button2: "오락", button3: "상관없음" },
    { question: "이색적인 취미 vs 보편적인 취미", button1: "이색적인", button2: "보편적인", button3: "상관없음" }
  ];
  res.json(questionsAndAnswers);
});

app.post('/save-clicked-button', hobbyController.saveClickedButton);
app.post('/reset-answers', hobbyController.resetAnswers);
app.get('/get-recommendations', hobbyController.getRecommendations);
app.get('/get-hobby-keywords', hobbyController.getHobbyKeywords);
app.post('/save-hobby', userService.loginCheck, userService.adminCheck, hobbyController.saveHobby);

app.get('/user-count', userController.getUserCount);

// 현재 활성 세션 수를 반환하는 로직
app.get('/active-sessions', userController.getActiveSessions);

app.get('/logout', userController.logout);

app.delete('/delete-user/:id', userService.loginCheck, userService.adminCheck, userController.deleteUser);


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
