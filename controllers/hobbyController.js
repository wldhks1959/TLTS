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
