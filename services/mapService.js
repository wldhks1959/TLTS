import { searchPlacesByLocation, searchPlacesByKeyword } from '../repo/mapRepo.js';

let map; // 전역 변수 선언
let currentInfowindow = null;
let markers = [];
let infowindows = [];
let circle = null;
let alertShown = false;

const mapService = {
  setMapCenter(location) {
    if (!map) {
      throw new Error('Map is not initialized');
    }
    map.setCenter(location);

    const centerMarker = new kakao.maps.Marker({
      position: location,
      image: new kakao.maps.MarkerImage(
        "./images/marker_red.png",
        new kakao.maps.Size(24, 35)
      ),
      map: map
    });
  },

  displayMarker(place) {
    const marker = new kakao.maps.Marker({
      map: map,
      position: new kakao.maps.LatLng(place.y, place.x),
      image: new kakao.maps.MarkerImage(
        "./images/marker_yellow.png",
        new kakao.maps.Size(36, 52)
      ),
    });

    const localInfowindow = new kakao.maps.InfoWindow({
      content: `<div class="custom-info-window">
                  <div class="title">${place.place_name}</div>
                  <div class="address">${place.address_name ? '주소: ' + place.address_name : '주소 정보 없음'}</div>
                  <div class="category">${place.category_name ? '카테고리명: ' + place.category_name : '카테고리 정보 없음'}</div>
                </div>`
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
  },

  clearMarkers() {
    markers.forEach(marker => marker.setMap(null));
    markers = [];
    infowindows = [];
    if (currentInfowindow) {
      currentInfowindow.close();
      currentInfowindow = null;
    }
  },

  showInfowindow(index) {
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

  initMap(mapContainer, mapOption) {
    map = new kakao.maps.Map(mapContainer, mapOption);
  }
};

const searchService = {
  async searchByLocation(location, radius, keyword) {
    try {
      const data = await searchPlacesByLocation(location, radius, keyword);
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
    } catch (error) {
      if (!alertShown) {
        alert(error);
        alertShown = true;
      }
    }
  },

  async search(keyword) {
    try {
      const data = await searchPlacesByKeyword(keyword);
      mapService.clearMarkers();
      const bounds = new kakao.maps.LatLngBounds();
      data.forEach(place => {
        mapService.displayMarker(place);
        bounds.extend(new kakao.maps.LatLng(place.y, place.x));
      });
      map.setBounds(bounds);
      mapService.showInfowindow(0);

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
    } catch (error) {
      if (!alertShown) {
        alert(error);
        alertShown = true;
        history.back();
      }
    }
  }
};

export { mapService, searchService };
