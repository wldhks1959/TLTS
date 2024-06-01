// const hobbyService = require('../services/hobbyService');

// exports.searchHobby = (req, res) => {
//   const keywords = req.body.keywords;
//   if (!keywords) {
//     res.send('키워드를 하나 이상 선택해주세요.');
//     return;
//   }

//   hobbyService.searchHobby(keywords)
//     .then(results => {
//       if (results.length > 0) {
//         const hobby_id = results.map(result => result.hobby_id).join(', ');
//         res.send(`Matching hobby Names: ${hobby_id}`);
//       } else {
//         res.send('일치하는 취미가 없습니다.');
//       }
//     })
//     .catch(err => {
//       console.log(err);
//       res.send('취미 데이터를 불러오는데 실패했습니다.');
//     });
// };


const db = require('../config/db');

exports.searchHobby = (req, res) => {
    const choices = req.session.clickedButtons;

    console.log("Received choices: ", choices);

    const query = `
        SELECT hobby_id 
        FROM hobbies 
        WHERE I_O = ? AND S_M = ? AND P_W = ? 
        AND MV = ? AND H_B = ? 
        AND RESV = ? AND EQUIP = ? 
        AND SD_F = ? AND NORM = ?`;

    db.query(query, choices, (err, results) => {
        if (err) {
            console.error("Database query error: ", err);
            res.status(500).json({ error: err.message });
            return;
        }

        if (results.length === 0) {
            res.json([{ hobby_name: "결과 없음!" }]);
        } else {
            const hobbyIds = results.map(result => result.hobby_id);
            const hobbyDetailsQuery = `
                SELECT h.hobby_name, hi.image_path, h.description
                FROM hobbies h
                JOIN hobbiesimage hi ON h.hobby_name = hi.hobby_name
                WHERE h.hobby_name IN (?)`;

            db.query(hobbyDetailsQuery, [hobbyIds], (error, results) => {
                if (error) {
                    console.error("Database query error: ", error);
                    res.status(500).json({ error: error.message });
                    return;
                }

                res.json(results);
            });
        }
    });
};

// 동적으로 컬럼을 가져와 쿼리를 생성하는 함수
const generateInsertQuery = (tableName, columns) => {
    const cols = columns.map(col => col.Field).join(', ');
    const placeholders = columns.map(() => '?').join(', ');
    return `INSERT INTO ${tableName} (${cols}) VALUES (${placeholders})`;
};

const generateUpdateQuery = (tableName, columns, idColumn) => {
    const setClause = columns.map(col => `${col.Field} = ?`).join(', ');
    return `UPDATE ${tableName} SET ${setClause} WHERE ${idColumn} = ?`;
};

exports.getHobbyKeywords = (req, res) => {
    const query = `SHOW COLUMNS FROM hobbies`;

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching columns:', err);
            res.status(500).json({ error: 'Database error' });
        } else {
            // 모든 컬럼을 클라이언트로 보냅니다.
            res.status(200).json(results);
        }
    });
};

exports.addHobby = (req, res) => {
    db.query(`SHOW COLUMNS FROM hobbies`, (err, columns) => {
        if (err) {
            console.error('Error fetching columns:', err);
            res.status(500).json({ error: 'Database error' });
            return;
        }

        const insertQuery = generateInsertQuery('hobbies', columns);
        const values = columns.map(column => req.body[column.Field] || null);

        db.query(insertQuery, values, (err, result) => {
            if (err) {
                console.error('Error inserting hobby:', err);
                res.status(500).json({ error: 'Database error' });
            } else {
                res.status(200).json({ message: 'Hobby added successfully' });
            }
        });
    });
};

exports.updateHobby = (req, res) => {
    db.query(`SHOW COLUMNS FROM hobbies`, (err, columns) => {
        if (err) {
            console.error('Error fetching columns:', err);
            res.status(500).json({ error: 'Database error' });
            return;
        }

        const updateQuery = generateUpdateQuery('hobbies', columns, 'hobby_id');
        const values = columns.map(column => req.body[column.Field] || null);
        values.push(req.body.hobby_id);

        db.query(updateQuery, values, (err, result) => {
            if (err) {
                console.error('Error updating hobby:', err);
                res.status(500).json({ error: 'Database error' });
            } else {
                res.status(200).json({ message: 'Hobby updated successfully' });
            }
        });
    });
};

exports.addHobbyKeyword = (req, res) => {
    const { keywordName, enumValue1, enumValue2, enumValue3 } = req.body;

    const query = `
        ALTER TABLE hobbies
        ADD COLUMN ${keywordName} ENUM('${enumValue1}', '${enumValue2}', '${enumValue3}')
    `;

    db.query(query, (err, result) => {
        if (err) {
            console.error('Error adding hobby keyword:', err);
            res.status(500).send('<script>alert("Database error"); window.location.href = "/admin";</script>');
        } else {
            res.status(200).send('<script>alert("Hobby keyword added successfully"); window.location.href = "/admin";</script>');
        }
    });
};
