const bcrypt = require('bcrypt');
const userRepository = require('../repo/userRepo');

exports.register = async (username, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  await userRepository.createUser({ username, password: hashedPassword });
};

exports.login = async (username, password) => {
  const user = await userRepository.findUserByUsername(username);
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
  return UserRepo.updatePassword(username, hashedPassword);
};