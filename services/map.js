// map.js

var alertShown = false; // 전역 변수로 선언하여 alert의 중복을 방지합니다.

// 지도를 표시할 div와 옵션을 설정합니다
var mapContainer = document.getElementById("map"), // 지도를 표시할 div
    mapOption = {
        center: new kakao.maps.LatLng(35.11719379721626, 128.96776005910738), // 지도의 중심좌표
        level: 5, // 지도의 확대 레벨
    };

// 지도를 생성합니다
var map = new kakao.maps.Map(mapContainer, mapOption);

// 중심 좌표를 변수에 저장합니다
var centerCoords = new kakao.maps.LatLng(35.11719379721626, 128.96776005910738);

// 기준 마커 아이콘을 설정합니다
var centerMarkerImage = new kakao.maps.MarkerImage(
    "./images/marker_red.png",
    new kakao.maps.Size(24, 35)
);

// 검색 마커 아이콘을 설정합니다
var searchMarkerImage = new kakao.maps.MarkerImage(
    "./images/marker_yellow.png",
    new kakao.maps.Size(24, 35)
);

// 기준 마커를 생성합니다
var marker = new kakao.maps.Marker({
    position: centerCoords,
    image: centerMarkerImage,
});

// 기준 마커를 지도 위에 표시합니다
marker.setMap(map);

// 인포윈도우를 생성합니다
var infowindow = new kakao.maps.InfoWindow({
    content: '<div style="padding:5px;">동아대학교 S06 기준</div>',
});

var infowindowOpen = false;

// 마커에 클릭 이벤트를 등록합니다
kakao.maps.event.addListener(marker, "click", function () {
    if (infowindowOpen) {
        infowindow.close();
        infowindowOpen = false;
    } else {
        if (currentInfowindow) {
            currentInfowindow.close();
        }
        infowindow.open(map, marker);
        currentInfowindow = infowindow;
        infowindowOpen = true;
    }
});

// 지도 중심을 설정하는 함수
function setCenter() {
    map.setCenter(centerCoords);
    marker.setPosition(centerCoords);
}

// 지도 중심을 부드럽게 이동시키는 함수
function panTo() {
    map.panTo(centerCoords);
    marker.setPosition(centerCoords);
}

// 키워드로 장소를 검색하는 함수
function search(keyword) {
    console.log(keyword);
    if (keyword === 'ANY') {
        if (!alertShown) {
            alert("어디서든 즐길 수 있어요.");
            alertShown = true;
        }
        history.back();
        return;
    }

    if (!keyword) {
        alert("키워드를 입력하세요.");
        return;
    }

    var ps = new kakao.maps.services.Places();

    var placesSearchCB = function (data, status, pagination) {
        if (status === kakao.maps.services.Status.OK) {
            clearMarkers();
            var bounds = new kakao.maps.LatLngBounds();
            for (var i = 0; i < data.length; i++) {
                displayMarker(data[i]);
                bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
            }
            map.setBounds(bounds);
        } else if (!alertShown) {
            alert("검색 결과가 없습니다.");
            alertShown = true;
            history.back();
        }
    };

    var center = map.getCenter();
    var options = {
        location: center,
        radius: 3000,
        sort: kakao.maps.services.SortBy.DISTANCE,
    };
    ps.keywordSearch(keyword, placesSearchCB, options);
}

// 마커를 담을 배열입니다
var markers = [];
var currentInfowindow = null;

// 마커를 생성하고 지도에 표시하는 함수
function displayMarker(place) {
    var marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
        image: searchMarkerImage,
    });

    var localInfowindow = new kakao.maps.InfoWindow({
        content: '<div class="info-window"><div class="title">' + place.place_name + '</div>' +
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
}

// 기존 마커를 모두 제거
function clearMarkers() {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
    markers = [];
    if (currentInfowindow) {
        currentInfowindow.close();
        currentInfowindow = null;
    }
}

// 페이지 로드 시 URL 파라미터로부터 키워드를 읽어와 자동으로 검색
document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const hobbyPlace = urlParams.get('hobby_place');
    if (hobbyPlace) {
        search(hobbyPlace);
    }
});
