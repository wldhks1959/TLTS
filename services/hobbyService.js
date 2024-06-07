const hobbyRepository = require('../repo/hobbyRepo');

exports.searchHobby = (keywords) => {
  return hobbyRepository.findHobbiesByKeywords(keywords);
};

exports.getRecommendations = (choices) => {
  return hobbyRepository.getRecommendations(choices);
};

// saveClickedButton에 사용할 함수.
const convertToEnum = (buttonContent) => {
  switch (buttonContent) {
      case "실내": return "indoor";
      case "실외": return "outdoor";
      case "혼자": return "solo";
      case "같이": return "multi";
      case "직접하기": return "play";
      case "눈으로만": return "watch";
      case "가만히": return "static";
      case "적당히 움직이기": return "normal";
      case "활발하게!": return "dynamic";
      case "힐링하기": return "healing";
      case "불태우기!": return "burning";
      case "좋아": return "yes";
      case "싫어": return "no";
      case "자기계발": return "self development";
      case "오락": return "fun";
      case "이색적인": return "special";
      case "보편적인": return "normal";
      default: return "ANY";
  }
};

exports.saveClickedButton = (session, buttonContent) => {
  if (!session.clickedButtons) {
    session.clickedButtons = [];
  }
  const enumValue = convertToEnum(buttonContent);

  if (enumValue) {
    session.clickedButtons.push(enumValue);
    console.log(session.clickedButtons);
  }
};

exports.getAllHobbies = () => {
  return hobbyRepository.getAllHobbies();
};

exports.getHobbyKeywords = () => {
  return hobbyRepo.getHobbyKeywords();
};

exports.saveHobby = (hobbyData) => {
  return hobbyRepo.saveHobby(hobbyData);
};