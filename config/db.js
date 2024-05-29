const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '0116',
  database: 'user_db'
});

db.connect((err) => {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + db.threadId);
});

const createUserTable = `
  CREATE TABLE IF NOT EXISTS users (
    username VARCHAR(30) NOT NULL PRIMARY KEY,
    password VARCHAR(200) NOT NULL
  )
`;

db.query(createUserTable, (err, result) => {
  if (err) throw err;
  console.log("User table created or already exists.");
});

module.exports = db;