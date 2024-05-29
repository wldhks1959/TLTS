// const hobbyRepository = require('../repo/hobbyRepo');

// exports.searchHobby = (keywords) => {
//   return hobbyRepository.findHobbiesByKeywords(keywords);
// };

const hobbyRepo = require('../repo/hobbyRepo');

exports.searchHobby = async (choices) => {
    const hobbies = await hobbyRepo.findHobbiesByKeywords(choices);
    return hobbies;
};
