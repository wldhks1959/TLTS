const bcrypt = require('bcrypt');
const userRepo = require('../repo/userRepo');

exports.register = async (user_id, user_name, user_pwd) => {
  const hashedPassword = await bcrypt.hash(user_pwd, 10);
  await userRepo.createUser({ user_id, user_name, user_pwd: hashedPassword });
};

exports.login = async (user_id, user_pwd) => {
  const user = await userRepo.findUserByUsername(user_id);
  console.log("User fetched from DB:", user);  // 사용자 정보 로그 출력
  return user;  // user 객체를 반환
};

exports.changePassword = async (user_id, user_pwd, confirmPassword) => {
  if (user_pwd !== confirmPassword) {
    throw new Error("비밀번호가 일치하지 않음");
  }

  const hashedPassword = await bcrypt.hash(user_pwd, 10);
  return userRepo.updatePassword(user_id, hashedPassword);
};
