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
