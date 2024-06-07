const hobbyService = require('../services/hobbyService');

// 취미 검색
exports.searchHobby = async (req, res) => {
  const choices = req.session.clickedButtons;
  try {
    const results = await hobbyService.searchHobby(choices);
    if (results.length === 0) {
      res.json([{ hobby_name: "결과 없음!" }]);
    } else {
      res.json(results);
    }
  } catch (err) {
    console.error("Database query error: ", err);
    res.status(500).json({ error: err.message });
  }
};

// 추천 가져오기
exports.getRecommendations = async (req, res) => {
    if (!req.session.clickedButtons) {
      return res.json([]);
    }
  
    const choices = req.session.clickedButtons;
  
    try {
      const results = await hobbyService.getRecommendations(choices);
      res.json(results);
    } catch (err) {
      console.error('Database query error: ', err);
      res.status(500).json({ error: err.message });
    }
};

// 
exports.saveClickedButton = (req, res) => {
    const { buttonContent } = req.body;
    hobbyService.saveClickedButton(req.session, buttonContent);
    res.sendStatus(200);
};

// 초기화 함수.
exports.resetAnswers = (req, res) => {
    req.session.clickedButtons = [];
    res.sendStatus(200);
};

// 첫 화면 6개 메인 취미 띄우는 함수.
exports.getMainHobbies = (req, res) => {
  const hobbies = [
    { hobby_id: "가라데", image_path: "/images/hobby_img/가라데.webp" },
    { hobby_id: "드라이브", image_path: "/images/hobby_img/드라이브.webp" },
    { hobby_id: "목공예", image_path: "/images/hobby_img/목공예.webp" },
    { hobby_id: "사격", image_path: "/images/hobby_img/사격.webp" },
    { hobby_id: "수상스키", image_path: "/images/hobby_img/수상스키.webp" },
    { hobby_id: "요가", image_path: "/images/hobby_img/요가.webp" }
  ];
  res.json(hobbies);
};

// 모든 취미 가져오는 함수.
exports.getHobbies = async (req, res) => {
  try {
    const hobbies = await hobbyService.getAllHobbies();
    res.status(200).json(hobbies);
  } catch (err) {
    console.error('Error fetching hobbies:', err);
    res.status(500).json({ error: 'Database error' });
  }
};

// 취미 키워드 (column 내용) 가져오는 함수.
exports.getHobbyKeywords = async (req, res) => {
    try {
      const results = await hobbyService.getHobbyKeywords();
      res.status(200).json(results);
    } catch (err) {
      console.error('Error fetching columns:', err);
      res.status(500).json({ error: 'Database error' });
    }
};

// 취미 추가 및 수정하는 함수.
exports.saveHobby = async (req, res) => {
    const hobbyData = req.body;
    try {
      const message = await hobbyService.saveHobby(hobbyData);
      res.send(message);
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
};