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

exports.getRecommendations = (choices) => {
  const columns = ['I_O', 'S_M', 'P_W', 'MV', 'H_B', 'RESV', 'EQUIP', 'SD_F', 'NORM'];

  const caseStatements = columns.map((col, index) => {
    return choices[index] === 'ANY' ? `1` : `IF(h.${col} = ? or h.${col} = 'ANY', 1, 0)`;
  }).join(' + ');

  const query = `
    SELECT h.hobby_id, h.hobby_place, hi.image_path,
    (${caseStatements}) AS satisfied_conditions
    FROM hobbies h
    JOIN hobbiesimage hi ON h.hobby_id = hi.hobby_id
    ORDER BY satisfied_conditions DESC
    LIMIT 9`;

  const params = choices.filter(choice => choice !== 'ANY');

  return new Promise((resolve, reject) => {
    db.query(query, params, (err, results) => {
      if (err) reject(err);
      const allResults = results.map(result => ({
        hobby_id: result.hobby_id,
        image_path: result.image_path,
        hobby_place: result.hobby_place,
        satisfied_conditions: (result.satisfied_conditions / choices.length) * 100 // Convert to percentage
      }));
      resolve(allResults);
    });
  });
};

exports.getAllHobbies = () => {
  const query = 'SELECT * FROM hobbies';
  return new Promise((resolve, reject) => {
    db.query(query, (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
};

exports.getHobbyKeywords = () => {
  const query = 'SHOW COLUMNS FROM hobbies';
  return new Promise((resolve, reject) => {
    db.query(query, (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
};

exports.saveHobby = (hobbyData) => {
  const hobbyId = hobbyData.hobby_id;
  const queryCheck = `SELECT * FROM hobbies WHERE hobby_id = ?`;

  return new Promise((resolve, reject) => {
    db.query(queryCheck, [hobbyId], (err, results) => {
      if (err) return reject('Database query error');
      if (results.length > 0) {
        // Hobby exists, perform an update
        const updateQuery = 'UPDATE hobbies SET ? WHERE hobby_id = ?';
        db.query(updateQuery, [hobbyData, hobbyId], (err, updateResults) => {
          if (err) return reject('Error updating hobby');
          resolve('Hobby updated successfully');
        });
      } else {
        // Hobby does not exist, perform an add
        const insertQuery = 'INSERT INTO hobbies SET ?';
        db.query(insertQuery, hobbyData, (err, insertResults) => {
          if (err) return reject('Error adding hobby');
          resolve('Hobby added successfully');
        });
      }
    });
  });
};