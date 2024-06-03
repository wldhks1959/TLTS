const db = require('../config/db');

exports.createUser = ({ user_id, user_name, user_pwd }) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO userinfo (user_id, user_name, user_pwd) VALUES (?, ?, ?)';
    db.query(query, [user_id, user_name, user_pwd], (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

exports.findUserByUsername = (user_id) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM userinfo WHERE user_id = ?', [user_id], (err, results) => {
      if (err) reject(err);
      resolve(results[0]);
    });
  });
};

exports.updatePassword = (user_id, hashedPassword) =>{
  return new Promise((resolve, reject) => {
    db.query('UPDATE userinfo SET user_pwd = ? Where user_id = ?', [hashedPassword, user_id], (err,result) =>{
      if(err){
        reject(err);
      }
      else{
        resolve(result);
      }
    } );
  });
};
