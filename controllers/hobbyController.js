const db = require('../config/db');

// exports.searchHobby = (req, res) => {
//     const choices = req.session.clickedButtons;

//     console.log("Received choices: ", choices);

//     const query = `
//         SELECT hobby_id 
//         FROM hobbies 
//         WHERE I_O = ? AND S_M = ? AND P_W = ? 
//         AND MV = ? AND H_B = ? 
//         AND RESV = ? AND EQUIP = ? 
//         AND SD_F = ? AND NORM = ?`;

//     db.query(query, choices, (err, results) => {
//         if (err) {
//             console.error("Database query error: ", err);
//             res.status(500).json({ error: err.message });
//             return;
//         }

//         console.log("Query executed. Results: ", results);
//         if (results.length === 0) {
//             res.json([{ hobby_name: "결과 없음!" }]);
//         } else {
//             res.json(results);
//         }
//     });
// };

const hobbyService = require('../services/hobbyService');

exports.searchHobby = async (req, res) => {
    const choices = req.session.clickedButtons;
    console.log("Received choices: ", choices);

    try {
        const hobbies = await hobbyService.searchHobby(choices);
        req.session.hobbyResults = hobbies;  // 검색 결과를 세션에 저장
        return hobbies;  // 검색 결과 반환
    } catch (error) {
        console.error("Error searching hobby: ", error);
        throw new Error(error.message);
    }
};

