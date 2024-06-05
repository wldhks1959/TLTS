var alertShown = false; // 전역 변수로 선언하여 alert의 중복을 방지합니다.

// 지도를 표시할 div와 옵션을 설정합니다
var mapContainer = document.getElementById("map"), // 지도를 표시할 div
    mapOption = {
        center: new kakao.maps.LatLng(35.11719379721626, 128.96776005910738), // 지도의 중심좌표
        level: 5, // 지도의 확대 레벨
    };

// 지도를 생성합니다
var map = new kakao.maps.Map(mapContainer, mapOption);

// 기준 마커 아이콘을 설정합니다
var centerMarkerImage = new kakao.maps.MarkerImage(
    "./images/marker_red.png",
    new kakao.maps.Size(24, 35)
);

// 검색 마커 아이콘을 설정합니다
var searchMarkerImage = new kakao.maps.MarkerImage(
    "./images/marker_yellow.png",
    new kakao.maps.Size(36, 52)
);

// 별 모양 마커 아이콘을 설정합니다
var starMarkerImage = new kakao.maps.MarkerImage(
    "./images/marker_star.png",
    new kakao.maps.Size(36, 52)
);

var infowindowOpen = false;
var currentInfowindow = null;
var starMarker = null;
var currentKeyword = null; // 현재 키워드를 저장하는 변수
var circle = null; // 원 객체를 저장할 변수
var markers = [];
var infowindows = [];
var currentMarkerIndex = 0;

// 마커를 생성하고 지도에 표시하는 함수
function displayMarker(place) {
    var marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
        image: searchMarkerImage,
    });

    var localInfowindow = new kakao.maps.InfoWindow({
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
}

// 기존 마커를 모두 제거
function clearMarkers() {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
    markers = [];
    infowindows = [];
    if (currentInfowindow) {
        currentInfowindow.close();
        currentInfowindow = null;
    }
}

function nextTo() {
    if (markers.length === 0) {
        return;
    }

    currentMarkerIndex = (currentMarkerIndex + 1) % markers.length;
    showInfowindow(currentMarkerIndex);
}

function prevTo() {
    if (markers.length === 0) {
        return;
    }

    currentMarkerIndex = (currentMarkerIndex - 1 + markers.length) % markers.length;
    showInfowindow(currentMarkerIndex);
}

function showInfowindow(index) {
    var marker = markers[index];
    var infowindow = infowindows[index];
    var position = marker.getPosition();

    map.panTo(position);

    if (currentInfowindow) {
        currentInfowindow.close();
    }

    infowindow.open(map, marker);
    currentInfowindow = infowindow;
}

// 위치를 기준으로 장소를 검색하는 함수
function searchByLocation(location, radius, keyword) {
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
        } else if (!alertShown) {
            alert("검색 결과가 없습니다.");
            alertShown = true;
        }
    };

    var options = {
        location: location,
        radius: radius,
        sort: kakao.maps.services.SortBy.DISTANCE,
    };
    ps.keywordSearch(keyword, placesSearchCB, options);
}

// 키워드로 장소를 검색하는 함수
function search(keyword) {
    currentKeyword = keyword;
    if (keyword === 'ANY') {
        if (!alertShown) {
            alert("어디서든 즐길 수 있어요.");
            alertShown = true;
            history.back();
        }
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

// 사용자의 위치 정보를 가져와 지도의 중심으로 설정하는 함수
function setMapCenterByUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var lat = position.coords.latitude;
            var lon = position.coords.longitude;
            var locPosition = new kakao.maps.LatLng(lat, lon);
            console.log(lat);
            console.log(lon);
            
            map.setCenter(locPosition);

            var centerMarker = new kakao.maps.Marker({
                position: locPosition,
                image: centerMarkerImage,
                map: map
            });

            if (currentKeyword) {
                searchByLocation(locPosition, 5000, currentKeyword);
            }
        }, function(error) {
            alert("사용자의 위치를 가져올 수 없습니다. 위치 접근을 허용해 주세요.");
        });
    } else {
        alert("Geolocation을 지원하지 않는 브라우저입니다.");
    }
}

// 페이지 로드 시 URL 파라미터로부터 키워드를 읽어와 자동으로 검색
document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const hobbyPlace = urlParams.get('hobby_place');
    const hobbyId = urlParams.get('hobby_id');
    if (hobbyPlace && hobbyId) {
        document.getElementById('search-result').innerText = `${hobbyId} 검색 결과입니다. 아래 장소에서 즐길 수 있습니다.`;
        currentKeyword = hobbyId;
        setMapCenterByUserLocation(); // 사용자의 위치를 중심으로 설정
    }
});