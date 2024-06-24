const bcrypt = require('bcrypt');
const userRepository = require('../repo/userRepo');

exports.register = async (user_id, user_name, user_pwd) => {
  const hashedPassword = await bcrypt.hash(user_pwd, 10);
  await userRepository.createUser({ user_id, user_name, user_pwd: hashedPassword });
};

exports.login = async (user_id, user_pwd) => {
  const user = await userRepository.findUserByUsername(user_id);
  console.log("User fetched from DB:", user);  // 사용자 정보 로그 출력
  return user;  // user 객체를 반환
};

exports.changeInfo = async (user_id, user_pwd, confirmPassword, address) => {
  if (user_pwd !== confirmPassword) {
    throw new Error("비밀번호가 일치하지 않음");
  }

  const hashedPassword = await bcrypt.hash(user_pwd, 10);
  return userRepository.updateInfo(user_id, hashedPassword, address);
};

exports.getAllUsers = async () => {
  return userRepository.getAllUsers();
};

exports.getUserCount = (callback) => {
  userRepository.getUserCount(callback);
};

// Middleware for login and admin check
exports.loginCheck = (req, res, next) => {
  if (req.session.user_id) {
    next();
  } else {
    res.send(`<script>alert('로그인부터 해주세요.'); window.location.href = '/login';</script>`);
  }
};

exports.adminCheck = (req, res, next) => {
  if (req.session.is_admin) {
    next();
  } else {
    res.send(`<script>alert('관리자만 접근 가능합니다.'); window.location.href = '/main';</script>`);
  }
};

exports.logout = (req, res, callback) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Error destroying session:', err);
      callback(err);
    } else {
      callback(null);
    }
  });
};

exports.deleteUser = async (user_id) => {
  return userRepository.deleteUser(user_id);
};
