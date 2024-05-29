const bcrypt = require('bcrypt');
const userRepo = require('../repo/userRepo');

exports.register = async (user_id, user_name, user_pwd) => {
  const hashedPassword = await bcrypt.hash(user_pwd, 10);
  await userRepo.createUser({ user_id, user_name, user_pwd: hashedPassword });
};

exports.login = async (user_id, user_pwd) => {
  const user = await userRepo.findUserByUsername(user_id);
  if (user) {
    const match = await bcrypt.compare(user_pwd, user.user_pwd);
    return match;
  }
  throw new Error('User not found');
};

exports.changePassword = async (user_id, user_pwd, confirmPassword) => {
  if (user_pwd !== confirmPassword) {
    throw new Error("Passwords do not match");
  }

  const hashedPassword = await bcrypt.hash(user_pwd, 10);
  return userRepo.updatePassword(user_id, hashedPassword);
};