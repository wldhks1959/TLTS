const hobbyRepository = require('../repo/hobbyRepo');

exports.searchHobby = (keywords) => {
  return hobbyRepository.findHobbiesByKeywords(keywords);
};
