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

exports.updateInfo = (user_id, hashedPassword, address) => {
  return new Promise((resolve, reject) => {
    db.query('UPDATE userinfo SET user_pwd = ?, user_addr = ? WHERE user_id = ?', [hashedPassword, address, user_id], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

exports.getAllUsers = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM userinfo', (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
};

exports.getUserCount = (callback) => {
  db.query('SELECT COUNT(*) as user_count FROM userinfo', (err, results) => {
    if (err) {
      console.error('Database query error:', err); // 오류 로그 추가
      return callback(err, null);
    }
    console.log('Database query results:', results); // 쿼리 결과 로그 추가
    callback(null, results[0].user_count);
  });
};

exports.deleteUser = (user_id) => {
  return new Promise((resolve, reject) => {
    db.query('DELETE FROM userinfo WHERE user_id = ?', [user_id], (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};
