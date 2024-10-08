const userService = require('../services/userService');
const bcrypt = require('bcrypt');  // bcrypt 모듈 가져오기
const db = require('../config/db');

exports.checkLogin = (req, res) => {
  if (req.session.user_id) { 
    res.json({ loggedIn: true });
  } else { 
    res.json({ loggedIn: false });
  }
};

exports.register = async (req, res) => {
  const { user_id, user_name, user_pwd } = req.body;
  try {
    await userService.register(user_id, user_name, user_pwd);
    res.send(`<script>alert('회원가입 성공'); window.location.href = '/login';</script>`);
  } catch (error) {
    console.error('회원가입 에러:', error); // 에러 로그 추가
    res.send(`<script>alert('이미 존재하는 아이디입니다. 다른 아이디를 입력하세요'); window.location.href = '/register';</script>`);
  }
};

exports.getUserId = (req, res) => {
  const user_id = req.session.user_id;
  res.json({ user_id: user_id });
};

exports.login = async (req, res) => {
  const { user_id, user_pwd } = req.body;
  try {
    const user = await userService.login(user_id, user_pwd);
    if (user) {
      const match = await bcrypt.compare(user_pwd, user.user_pwd);
      if (match) {
        req.session.user_id = user_id;
        req.session.is_admin = (user.user_id === 'admin'); // 관리자 여부 확인 및 세션에 저장

        if (req.session.is_admin) { 
          res.send(`<script>alert('관리자로 로그인 성공'); window.location.href = '/admin';</script>`);
        } else { 
          res.send(`<script>alert('로그인 성공'); window.location.href = '/main';</script>`);
        }
      } else {
        res.send(`<script>alert('비밀번호 불일치.'); window.location.href = '/login';</script>`);
      }
    } else {
      res.send(`<script>alert('회원을 찾을 수 없음.'); window.location.href = '/login';</script>`);
    }
  } catch (error) {
    console.error('로그인 에러:', error); // 에러 로그 추가
    res.send(`<script>alert('회원 찾기 실패!.'); window.location.href = '/login';</script>`);
  }
};

exports.modify = async (req, res) => {
  const { user_id, user_pwd, confirmPassword, address } = req.body;

  try {
    await userService.changeInfo(user_id, user_pwd, confirmPassword, address);
    res.send('<script>alert("회원 정보가 성공적으로 변경되었습니다."); window.location.href = "/main";</script>');
  } catch (error) {
    res.send(`<script>alert("${error.message}"); window.location.href = "/modify";</script>`);
  }
};

exports.getAllUsers = (req, res) => {
  userService.getAllUsers().then(users => {
    res.status(200).json(users);
  }).catch(err => {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Database error' });
  });
};

exports.getUserCount = (req, res) => {
  userService.getUserCount((err, user_count) => {
    if (err) {
      console.error('Error fetching user count:', err);
      res.status(500).send('Error fetching user count');
      return;
    }
    res.json({ user_count });
  });
};

exports.logout = (req, res) => {
  userService.logout(req, res, (err) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.send('<script>alert("로그아웃 되었습니다."); window.location.href = "/";</script>');
    }
  });
};

exports.getActiveSessions = (req, res) => {
  const activeSessions = Object.keys(req.sessionStore.sessions).length;
  res.json({ active_sessions: activeSessions });
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await userService.deleteUser(id);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Failed to delete user:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
};
