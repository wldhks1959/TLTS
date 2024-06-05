// mapRepo.js

let markers = [];
let infowindows = [];
let currentMarkerIndex = 0;

exports.clearMarkers = () => {
  markers.forEach(marker => marker.setMap(null));
  markers = [];
  infowindows = [];
};

exports.displayMarkers = (data) => {
  const bounds = new kakao.maps.LatLngBounds();
  data.forEach(place => {
    const marker = new kakao.maps.Marker({
      map: map,
      position: new kakao.maps.LatLng(place.y, place.x),
      image: searchMarkerImage
    });

    const localInfowindow = new kakao.maps.InfoWindow({
      content: '<div class="custom-info-window"><div class="title">' + place.place_name + '</div>' +
               '<div class="address">' + (place.address_name ? '주소: ' + place.address_name : '주소 정보 없음') + '</div>' +
               '<div class="category">' + (place.category_name ? '카테고리명: ' + place.category_name : '카테고리 정보 없음') + '</div></div>'
    });

    kakao.maps.event.addListener(marker, "click", function () {
      if (currentInfowindow) {
        currentInfowindow.close();
      }
      localInfowindow.open(map, marker);
      currentInfowindow = localInfowindow;
    });

    markers.push(marker);
    infowindows.push(localInfowindow);
    bounds.extend(new kakao.maps.LatLng(place.y, place.x));
  });
  map.setBounds(bounds);
};

exports.keywordSearch = (keyword, location, radius, callback) => {
  const ps = new kakao.maps.services.Places();
  const options = {
    location: location,
    radius: radius,
    sort: kakao.maps.services.SortBy.DISTANCE
  };
  ps.keywordSearch(keyword, function(data, status, pagination) {
    if (status === kakao.maps.services.Status.OK) {
      callback(data);
    } else {
      alert("검색 결과가 없습니다.");
    }
  }, options);
};

exports.getMarkerAndInfowindow = (index) => {
  return { marker: markers[index], infowindow: infowindows[index] };
};

exports.addCenterMarker = (location) => {
  new kakao.maps.Marker({
    position: location,
    image: centerMarkerImage,
    map: map
  });
};

exports.nextMarkerIndex = (callback) => {
  currentMarkerIndex = (currentMarkerIndex + 1) % markers.length;
  callback(currentMarkerIndex);
};

exports.prevMarkerIndex = (callback) => {
  currentMarkerIndex = (currentMarkerIndex - 1 + markers.length) % markers.length;
  callback(currentMarkerIndex);
};
