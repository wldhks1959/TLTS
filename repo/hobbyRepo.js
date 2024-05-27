const db = require('../config/db');

exports.findHobbiesByKeywords = (keywords) => {
  const keywordArray = Array.isArray(keywords) ? keywords : [keywords];

  const conditions = keywordArray.map(keyword => {
    return `(a = ? OR b = ? OR c = ? OR d = ? OR e = ? OR f = ? OR g = ? OR h = ? OR i = ? OR j = ? OR k = ? OR l = ?)`;
  });

  const query = `
    SELECT names FROM hobby
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
