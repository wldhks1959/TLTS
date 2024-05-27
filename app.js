const express = require('express');
const connection = require('./db');
const fs = require('fs');
const app = express();

// ENUM 값 추출 함수
function getEnumValues(tableName, columnName, callback) {
  const query = `SHOW COLUMNS FROM ${tableName} LIKE '${columnName}'`;
  connection.query(query, (err, results) => {
    if (err) return callback(err);

    const enumValues = results[0].Type.match(/enum\(([^)]+)\)/)[1].split(',').map(val => val.replace(/'/g, ''));
    callback(null, enumValues);
  });
}

app.get('/hobbies', (req, res) => {
  fs.readFile('./public/html/temp.html', 'utf8', (err, data) => {
    if (err) {
      console.error('파일 읽기 실패:', err);
      res.status(500).send('서버 오류');
      return;
    }
    res.send(data);
  });
});

app.get('/enumData', (req, res) => {
  const enums = ['I_O', 'S_M', 'P_W', 'MV', 'H_B', 'RESV', 'EQUIP', 'SD_F', 'NORM'];
  const enumData = {};
  let count = 0;

  enums.forEach(enumCol => {
    getEnumValues('hobbies', enumCol, (err, values) => {
      if (err) {
        console.error('ENUM 값 추출 실패:', err);
        res.status(500).send('서버 오류');
        return;
      }
      enumData[enumCol] = values;
      count++;

      if (count === enums.length) {
        res.json(enumData);
      }
    });
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
});
