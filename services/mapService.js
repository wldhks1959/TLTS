import { searchPlacesByLocation } from '../repo/mapRepo.js';

let map; // 전역 변수 선언
let currentInfowindow = null; // 현재 열려있는 정보 창을 저장하는 변수
let markers = []; // 생성된 마커들을 저장하는 배열
let infowindows = []; // 생성된 정보 창들을 저장하는 배열
let circle = null; // 검색 반경을 표시하는 원 객체
let alertShown = false; // 경고 메시지가 이미 표시되었는지 여부를 저장하는 변수

const mapService = {
  // 지도의 중심을 설정하는 함수
  setMapCenter(location) {
    if (!map) {
      throw new Error('Map is not initialized');
    }
    map.setCenter(location); // 지도의 중심을 설정
    // 중심 마커 생성
    const centerMarker = new kakao.maps.Marker({
      position: location,
      image: new kakao.maps.MarkerImage(
        "./images/marker_red.png",
        new kakao.maps.Size(24, 35)
      ),
      map: map
    });
  },

  // 장소 정보를 기반으로 마커를 생성하고 지도를 표시하는 함수
  displayMarker(place) {
    const marker = new kakao.maps.Marker({
      map: map,
      position: new kakao.maps.LatLng(place.y, place.x),
      image: new kakao.maps.MarkerImage(
        "./images/marker_yellow.png",
        new kakao.maps.Size(36, 52)
      ),
    });

    // 커스텀 정보 창 생성
    const localInfowindow = new kakao.maps.InfoWindow({
      content: `<div class="custom-info-window">
                <div class="title">${place.place_name}</div>
                <div class="address">${place.address_name ? '주소: ' + place.address_name : '주소 정보 없음'}</div>
                <div class="category">${place.category_name ? '카테고리명: ' + place.category_name : '카테고리 정보 없음'}</div>
                </div>`
    });

    // 마커 클릭 이벤트 추가
    kakao.maps.event.addListener(marker, "click", function () {
      if (currentInfowindow) {
        currentInfowindow.close();
      }
      localInfowindow.open(map, marker);
      currentInfowindow = localInfowindow;
    });

    markers.push(marker);
    infowindows.push(localInfowindow);
  },

  // 모든 마커를 제거하는 함수
  clearMarkers() {
    markers.forEach(marker => marker.setMap(null));
    markers = [];
    infowindows = [];
    if (currentInfowindow) {
      currentInfowindow.close();
      currentInfowindow = null;
    }
  },

  // 특정 인덱스의 정보 창을 표시하는 함수
  showInfowindow(index) {
    if (!map) {
      throw new Error('Map is not initialized');
    }

    const marker = markers[index];
    const infowindow = infowindows[index];
    const position = marker.getPosition();

    map.panTo(position);

    if (currentInfowindow) {
      currentInfowindow.close();
    }

    infowindow.open(map, marker);
    currentInfowindow = infowindow;
  },

  // 현재 생성된 마커의 개수를 반환하는 함수
  getMarkersLength() {
    return markers.length;
  },

  // 지도를 초기화하는 함수
  initMap(mapContainer, mapOption) {
    map = new kakao.maps.Map(mapContainer, mapOption);
  }
};

// 공통 로직을 처리하는 함수
async function handleSearchResults(data, location, radius) {
  mapService.clearMarkers();
  const bounds = new kakao.maps.LatLngBounds();
  data.forEach(place => {
    mapService.displayMarker(place);
    bounds.extend(new kakao.maps.LatLng(place.y, place.x));
  });
  map.setBounds(bounds);

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
}

const searchService = {
  // 위치와 반경, 키워드를 기반으로 장소를 검색하는 함수
  async searchByLocation(location, radius, keyword) {
    try {
      const data = await searchPlacesByLocation(location, radius, keyword);
      await handleSearchResults(data, location, radius);
    } catch (error) {
      if (!alertShown) {
        alert(error);
        alertShown = true;
      }
    }
  }
};

export { mapService, searchService };
