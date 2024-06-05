import { mapService, searchService } from '../services/mapService.js';

// 전역 변수 선언
let currentKeyword = null;

document.addEventListener("DOMContentLoaded", function() {
  const urlParams = new URLSearchParams(window.location.search);
  const hobbyPlace = urlParams.get('hobby_place');
  const hobbyId = urlParams.get('hobby_id');
  if (hobbyPlace && hobbyId) {
    document.getElementById('search-result').innerText = `${hobbyId} 검색 결과입니다. 아래 장소에서 즐길 수 있습니다.`;
    currentKeyword = hobbyId;
    setMapCenterByUserLocation(); // 사용자의 위치를 중심으로 설정
  }

  document.getElementById('prevButton').addEventListener('click', prevTo);
  document.getElementById('nextButton').addEventListener('click', nextTo);
   
  // 지도 초기화
  const mapContainer = document.getElementById('map');
  const mapOption = {
    center: new kakao.maps.LatLng(33.450701, 126.570667),
    level: 3
  };
  mapService.initMap(mapContainer, mapOption);
});

function setMapCenterByUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const locPosition = new kakao.maps.LatLng(lat, lon);
      console.log(lat);
      console.log(lon);

      mapService.setMapCenter(locPosition);

      if (currentKeyword) {
        searchService.searchByLocation(locPosition, 5000, currentKeyword);
      }
    }, function(error) {
      alert("사용자의 위치를 가져올 수 없습니다. 위치 접근을 허용해 주세요.");
    });
  } else {
    alert("Geolocation을 지원하지 않는 브라우저입니다.");
  }
}

function search(keyword) {
  if (keyword === 'ANY') {
    if (!alertShown) {
      alert("어디서든 즐길 수 있어요.");
      alertShown = true;
      history.back();
    }
    return;
  }

  searchService.search(keyword);
}

function prevTo() {
  // 이전 마커로 이동하는 로직 추가
  console.log('이전 마커로 이동');
}

function nextTo() {
  // 다음 마커로 이동하는 로직 추가
  console.log('다음 마커로 이동');
}
