const kakao = window.kakao;

const searchPlacesByLocation = (location, radius, keyword) => {
  return new Promise((resolve, reject) => {
    var ps = new kakao.maps.services.Places();
    var options = {
      location: location,
      radius: radius,
      sort: kakao.maps.services.SortBy.DISTANCE,
    };

    ps.keywordSearch(keyword, function(data, status) {
      if (status === kakao.maps.services.Status.OK) {
        resolve(data);
      } else {
        reject("검색 결과가 없습니다.");
        history.back();
      }
    }, options);
  });
};

export { searchPlacesByLocation };
