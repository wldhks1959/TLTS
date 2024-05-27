const hobbyService = require('../services/hobbyService');

exports.searchHobby = (req, res) => {
  const keywords = req.body.keywords;
  if (!keywords) {
    res.send('키워드를 하나 이상 선택해주세요.');
    return;
  }

  hobbyService.searchHobby(keywords)
    .then(results => {
      if (results.length > 0) {
        const names = results.map(result => result.names).join(', ');
        res.send(`Matching hobby Names: ${names}`);
      } else {
        res.send('일치하는 취미가 없습니다.');
      }
    })
    .catch(err => {
      console.log(err);
      res.send('취미 데이터를 불러오는데 실패했습니다.');
    });
};
