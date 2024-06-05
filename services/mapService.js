//mapService.js

const mapRepo = require('../repo/mapRepo');

let currentKeyword = null;
let currentMarkerIndex = 0;
let currentInfowindow = null;
let circle = null;

function clearMarkers() {
  mapRepo.clearMarkers();
  if (currentInfowindow) {
    currentInfowindow.close();
    currentInfowindow = null;
  }
}

function showInfowindow(index) {
  const { marker, infowindow } = mapRepo.getMarkerAndInfowindow(index);
  const position = marker.getPosition();

  map.panTo(position);

  if (currentInfowindow) {
    currentInfowindow.close();
  }

  infowindow.open(map, marker);
  currentInfowindow = infowindow;
}

exports.setMapCenterByUserLocation = (keyword) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const locPosition = new kakao.maps.LatLng(lat, lon);
      
      map.setCenter(locPosition);
      mapRepo.addCenterMarker(locPosition);

      currentKeyword = keyword;
      searchByLocation(locPosition, 5000, currentKeyword);
    }, function(error) {
      alert("사용자의 위치를 가져올 수 없습니다. 위치 접근을 허용해 주세요.");
    });
  } else {
    alert("Geolocation을 지원하지 않는 브라우저입니다.");
  }
};

exports.searchByLocation = (location, radius, keyword) => {
  mapRepo.keywordSearch(keyword, location, radius, function(data) {
    clearMarkers();
    mapRepo.displayMarkers(data);
    if (circle) {
      circle.setMap(null);
    }
    circle = new kakao.maps.Circle({
      center: location,
      radius: radius,
      strokeWeight: 1,
      strokeColor: '#0000FF',
      strokeOpacity: 0.8,
      strokeStyle: 'solid',
      fillColor: '#0000FF',
      fillOpacity: 0.3
    });
    circle.setMap(map);
  });
};

exports.search = (keyword) => {
  currentKeyword = keyword;
  const center = map.getCenter();
  mapRepo.keywordSearch(keyword, center, 3000, function(data) {
    clearMarkers();
    mapRepo.displayMarkers(data);
    showInfowindow(0);
    if (circle) {
      circle.setMap(null);
    }
    circle = new kakao.maps.Circle({
      center: map.getCenter(),
      radius: 5000,
      strokeWeight: 1,
      strokeColor: '#0000FF',
      strokeOpacity: 0.8,
      strokeStyle: 'solid',
      fillColor: '#0000FF',
      fillOpacity: 0.3
    });
    circle.setMap(map);
  });
};

exports.nextTo = () => {
  mapRepo.nextMarkerIndex((index) => {
    showInfowindow(index);
  });
};

exports.prevTo = () => {
  mapRepo.prevMarkerIndex((index) => {
    showInfowindow(index);
  });
};
