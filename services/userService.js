const bcrypt = require('bcrypt');
const userRepo = require('../repo/userRepo');

exports.register = async (username, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  await userRepo.createUser({ username, password: hashedPassword });
};

exports.login = async (username, password) => {
  const user = await userRepo.findUserByUsername(username);
  if (user) {
    const match = await bcrypt.compare(password, user.password);
    return match;
  }
  throw new Error('User not found');
};

exports.changePassword = async (username, password, confirmPassword) => {
  if (password !== confirmPassword) {
    throw new Error("Passwords do not match");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  return userRepo.updatePassword(username, hashedPassword);
};