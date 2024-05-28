const userService = require('../services/userService');

exports.checkLogin = (req, res) => {
  if (req.session.username) {
    res.json({ loggedIn: true });
  } else {
    res.json({ loggedIn: false });
  }
};

exports.register = async (req, res) => {
  const { username, password } = req.body;
  try {
    await userService.register(username, password);
    res.send(`<script>alert('회원가입 성공'); window.location.href = '/login';</script>`);
  } catch (error) {
    res.send(`<script>alert('이미 존재하는 아이디입니다. 다른 아이디를 입력하세요'); window.location.href = '/register';</script>`);
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const success = await userService.login(username, password);
    if (success) {
      req.session.username = username;
      res.send(`<script>alert('로그인 성공'); window.location.href = '/main';</script>`);
    } else {
      res.send(`<script>alert('비밀번호 불일치.'); window.location.href = '/login';</script>`);
    }
  } catch (error) {
    res.send(`<script>alert('회원을 찾을 수 없음.'); window.location.href = '/login';</script>`);
  }
};

exports.modify = async (req, res) => {
  const { username, password, confirmPassword } = req.body;

  try {
    await UserService.changePassword(username, password, confirmPassword);
    res.send('<script>alert("비밀번호가 성공적으로 변경되었습니다."); window.location.href = "/main";</script>');
  }
  catch (error) {
    res.send(`<script>alert("${error.message}"); window.location.href = "/modify";</script>`);
  }
};