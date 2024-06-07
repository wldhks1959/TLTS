// adminController.js
const db = require('../config/db');

// 취미 키워드 가져오는 함수 
exports.getHobbyKeywords = (req, res) => {
    const query = 'SHOW COLUMNS FROM hobbies';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching columns:', err);
            res.status(500).json({ error: 'Database error' });
        } else {
            res.status(200).json(results);
        }
    });
};

// 취미 저장 함수 
exports.saveHobby = (req, res) => {
    const hobbyData = req.body;  // 요청 본문에 JSON 형태로 취미 데이터가 전송된다고 가정

     // 데이터베이스에 해당 취미가 존재하는지 확인
    const hobbyId = hobbyData.hobby_id;
    const queryCheck = `SELECT * FROM hobbies WHERE hobby_id = ?`;

    db.query(queryCheck, [hobbyId], (err, results) => {
        if (err) {
            console.error('Error checking hobby:', err);
            return res.status(500).send('Database query error');
        }
        if (results.length > 0) {
            // 취미가 존재하면 업데이트 수행
            const updateQuery = 'UPDATE hobbies SET ? WHERE hobby_id = ?';

            db.query(updateQuery, [hobbyData, hobbyId], (err, updateResults) => {
                if (err) {
                    console.error('Error updating hobby:', err);
                    return res.status(500).send('Error updating hobby');
                } else {
                    res.send('Hobby updated successfully');
                }
            });
        } else {
             // 취미가 존재하지 않으면 추가 수행
            const insertQuery = 'INSERT INTO hobbies SET ?';
            
            db.query(insertQuery, hobbyData, (err, insertResults) => {
                if (err) {
                    console.error('Error adding hobby:', err);
                    return res.status(500).send('Error adding hobby');
                } else {
                    res.send('Hobby added successfully');
                }
            });
        }
    });
};

