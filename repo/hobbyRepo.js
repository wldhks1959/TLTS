// const db = require('../config/db');

// exports.findHobbiesByKeywords = (keywords) => {
//   const keywordArray = Array.isArray(keywords) ? keywords : [keywords];

//   const conditions = keywordArray.map(keyword => {
//     return `(hobby_id = ? OR hobby_place = ? OR I_O = ? OR S_M = ? OR P_W = ? OR MV = ? OR H_B = ? OR RESV = ? OR EQUIP = ? OR SD_F = ? OR NORM = ?)`;
//   });

//   const query = `
//     SELECT hobby_id FROM hobbies
//     WHERE ${conditions.join(' AND ')}
//   `;

//   const queryParams = keywordArray.flatMap(keyword => Array(12).fill(keyword));

//   return new Promise((resolve, reject) => {
//     db.query(query, queryParams, (err, results) => {
//       if (err) reject(err);
//       resolve(results);
//     });
//   });
// };

const db = require('../config/db');

exports.findHobbiesByKeywords = (choices) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT hobby_id, 
        (CASE WHEN I_O = ? THEN 1 ELSE 0 END +
        CASE WHEN S_M = ? THEN 1 ELSE 0 END +
        CASE WHEN P_W = ? THEN 1 ELSE 0 END +
        CASE WHEN MV = ? THEN 1 ELSE 0 END +
        CASE WHEN H_B = ? THEN 1 ELSE 0 END +
        CASE WHEN RESV = ? THEN 1 ELSE 0 END +
        CASE WHEN EQUIP = ? THEN 1 ELSE 0 END +
        CASE WHEN SD_F = ? THEN 1 ELSE 0 END +
        CASE WHEN NORM = ? THEN 1 ELSE 0 END) as match_count
      FROM hobbies
      ORDER BY match_count DESC
      LIMIT 6;
    `;

    db.query(query, choices, (err, results) => {
      if (err) {
        console.error("Database query error: ", err);
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};


