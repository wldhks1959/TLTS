const db = require('../config/db');

exports.findHobbiesByKeywords = (keywords) => {
  const keywordArray = Array.isArray(keywords) ? keywords : [keywords];

  const conditions = keywordArray.map(keyword => {
    return `(hobby_id = ? OR hobby_place = ? OR I_O = ? OR S_M = ? OR P_W = ? OR MV = ? OR H_B = ? OR RESV = ? OR EQUIP = ? OR SD_F = ? OR NORM = ?)`;
  });

  const query = `
    SELECT hobby_id FROM hobbies
    WHERE ${conditions.join(' AND ')}
  `;

  const queryParams = keywordArray.flatMap(keyword => Array(12).fill(keyword));

  return new Promise((resolve, reject) => {
    db.query(query, queryParams, (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
};
