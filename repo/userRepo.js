const db = require('../config/db');

exports.createUser = (user) => {
  return new Promise((resolve, reject) => {
    db.query('INSERT INTO users SET ?', user, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

exports.findUserByUsername = (username) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
      if (err) reject(err);
      resolve(results[0]);
    });
  });
};

exports.updatePassword = (username, hashedPassword) =>{
  return new Promise((resolve, reject) => {
    db.query('UPDATE users SET password = ? Where username = ?', [hashedPassword, username], (err,result) =>{
      if(err){
        reject(err);
      }
      else{
        resolve(result);
      }
    } )
  })
}
