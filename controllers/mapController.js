import { mapService, searchService } from '../services/mapService.js';

// 전역 변수 선언
let currentKeyword = null; // 현재 검색된 키워드를 저장하는 변수
let currentMarkerIndex = 0; // 현재 마커 인덱스를 저장하는 변수

document.addEventListener("DOMContentLoaded", function() {
  // URL 파라미터에서 hobby_place와 hobby_id를 가져옵니다.
  const urlParams = new URLSearchParams(window.location.search);
  const hobbyPlace = urlParams.get('hobby_place');
  const hobbyId = urlParams.get('hobby_id');
  
  // hobbyPlace와 hobbyId가 존재하면 검색 결과를 표시하고, 지도의 중심을 사용자의 위치로 설정합니다.
  if (hobbyPlace && hobbyId) {
    document.getElementById('search-result').innerText = `${hobbyId} 검색 결과입니다. 아래 장소에서 즐길 수 있습니다.`;
    currentKeyword = hobbyId;
    setMapCenterByUserLocation(); // 사용자의 위치를 중심으로 설정
  }

  // 이전 버튼과 다음 버튼에 클릭 이벤트를 추가합니다.
  document.getElementById('prevButton').addEventListener('click', prevTo);
  document.getElementById('nextButton').addEventListener('click', nextTo);
   
  // 지도 초기화
  const mapContainer = document.getElementById('map'); // 지도를 표시할 div
  const mapOption = {
    center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 초기 중심 좌표
    level: 3 // 지도의 초기 확대 레벨
  };
  mapService.initMap(mapContainer, mapOption); // mapService를 이용해 지도를 초기화
});

function setMapCenterByUserLocation() {
  // 사용자의 위치를 가져와 지도의 중심으로 설정합니다.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      const lat = position.coords.latitude; // 사용자의 위도
      const lon = position.coords.longitude; // 사용자의 경도
      const locPosition = new kakao.maps.LatLng(lat, lon); // 사용자의 위치를 LatLng 객체로 변환
      console.log(lat);
      console.log(lon);

      mapService.setMapCenter(locPosition); // 지도의 중심을 사용자의 위치로 설정

      // 현재 키워드가 존재하면 해당 위치를 중심으로 장소를 검색합니다.
      if (currentKeyword) {
        searchService.searchByLocation(locPosition, 5000, currentKeyword);
      }
    }, function(error) {
      alert("사용자의 위치를 가져올 수 없습니다. 위치 접근을 허용해 주세요."); // 위치 접근 실패 시 알림
    });
  } else {
    alert("Geolocation을 지원하지 않는 브라우저입니다."); // 브라우저가 Geolocation을 지원하지 않을 때 알림
  }
}

function search(keyword) {
  // 키워드가 'ANY'일 경우 특별한 알림을 표시하고, 페이지를 뒤로 이동합니다.
  if (keyword === 'ANY') {
    if (!alertShown) {
      alert("어디서든 즐길 수 있어요."); // 알림 메시지
      alertShown = true;
      history.back(); // 페이지 뒤로 이동
    }
    return;
  }

  searchService.search(keyword); // 검색 서비스 호출
}

function prevTo() {
  // 이전 마커로 이동하는 로직
  currentMarkerIndex = (currentMarkerIndex - 1 + mapService.getMarkersLength()) % mapService.getMarkersLength();
  mapService.showInfowindow(currentMarkerIndex);
}

function nextTo() {
  // 다음 마커로 이동하는 로직
  currentMarkerIndex = (currentMarkerIndex + 1) % mapService.getMarkersLength();
  mapService.showInfowindow(currentMarkerIndex);
}