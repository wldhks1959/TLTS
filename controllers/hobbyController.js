const db = require('../config/db');

// 취미 검색 함수
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

// Hobby 추가 및 업데이트는 adminController.js에서.