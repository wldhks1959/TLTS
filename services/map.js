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
    new kakao.maps.Size(36, 52)
);

// 별 모양 마커 아이콘을 설정합니다
var starMarkerImage = new kakao.maps.MarkerImage(
    "./images/marker_star.png",
    new kakao.maps.Size(36, 52)
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
    content: '<div class="custom-info-window">동아대학교 S06 기준</div>',
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

// 기존 별 모양 마커를 관리하는 변수
var starMarker = null;
var currentKeyword = null; // 현재 키워드를 저장하는 변수
var circle = null; // 원 객체를 저장할 변수

// 마우스로 지도를 클릭한 위치에 별 모양 마커 생성 및 해당 위치를 중심으로 검색
kakao.maps.event.addListener(map, "click", function(mouseEvent) {
    // 클릭한 위치의 좌표를 얻어옵니다
    var latlng = mouseEvent.latLng;

    // 기존 별 모양 마커가 있으면 제거
    if (starMarker) {
        starMarker.setMap(null);
    }

    // 별 모양 마커를 생성합니다
    starMarker = new kakao.maps.Marker({
        position: latlng,
        image: starMarkerImage,
        map: map
    });

    // 클릭한 위치를 중심으로 반경 5km 내의 장소를 검색합니다
    if (currentKeyword) {
        searchByLocation(latlng, 5000, currentKeyword);
    } else {
        alert("키워드가 설정되지 않았습니다.");
    }

    // 기존 원이 있으면 제거
    if (circle) {
        circle.setMap(null);
    }

    // 새로운 원을 생성하여 지도에 표시
    circle = new kakao.maps.Circle({
        center: latlng,
        radius: 5000, // 반경 5km
        strokeWeight: 1,
        strokeColor: '#0000FF',
        strokeOpacity: 0.8,
        strokeStyle: 'solid',
        fillColor: '#0000FF',
        fillOpacity: 0.3 // 투명도 50%
    });
    circle.setMap(map);
});

// 키워드로 장소를 검색하는 함수
function search(keyword) {
    currentKeyword = keyword; // 현재 키워드를 저장
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
            // 첫 번째 마커의 위치 정보를 인포윈도우로 표시
            showInfowindow(0);

            // 중심 좌표에 원을 그립니다
            if (circle) {
                circle.setMap(null);
            }
            circle = new kakao.maps.Circle({
                center: center,
                radius: 5000,
                strokeWeight: 1,
                strokeColor: '#0000FF',
                strokeOpacity: 0.8,
                strokeStyle: 'solid',
                fillColor: '#0000FF',
                fillOpacity: 0.3 // 투명도 50%
            });
            circle.setMap(map);
        } else if (!alertShown) {
            alert("검색 결과가 없습니다. 직접 마커를 옮겨가며 즐길 수 있는 곳을 찾아볼까요?");
            alertShown = true;
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
            // 첫 번째 마커의 위치 정보를 인포윈도우로 표시
            showInfowindow(0);

            // 새로운 원을 생성하여 지도에 표시
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
                fillOpacity: 0.3 // 투명도 50%
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
    ps.keywordSearch(keyword, placesSearchCB, options); // 키워드를 이용하여 검색
}

// 마커를 담을 배열입니다
var markers = [];
var infowindows = [];
var currentInfowindow = null;

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

// 현재 마커 인덱스를 저장하는 전역 변수
var currentMarkerIndex = 0;

function nextTo() {
    // 마커가 없으면 함수 종료
    if (markers.length === 0) {
        return;
    }

    // 다음 마커 인덱스 계산
    currentMarkerIndex = (currentMarkerIndex + 1) % markers.length;

    // 다음 마커의 위치 가져오기
    showInfowindow(currentMarkerIndex);
}

function prevTo() {
    // 마커가 없으면 함수 종료
    if (markers.length === 0) {
        return;
    }

    // 이전 마커 인덱스 계산
    currentMarkerIndex = (currentMarkerIndex - 1 + markers.length) % markers.length;

    // 이전 마커의 위치 가져오기
    showInfowindow(currentMarkerIndex);
}

function showInfowindow(index) {
    var marker = markers[index];
    var infowindow = infowindows[index];
    var position = marker.getPosition();

    // 지도 중심을 해당 마커 위치로 이동
    map.panTo(position);

    // 이전 인포윈도우 닫기
    if (currentInfowindow) {
        currentInfowindow.close();
    }

    // 새로운 인포윈도우 열기
    infowindow.open(map, marker);
    currentInfowindow = infowindow;
}

// 페이지 로드 시 URL 파라미터로부터 키워드를 읽어와 자동으로 검색
document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const hobbyPlace = urlParams.get('hobby_place');
    const hobbyId = urlParams.get('hobby_id');
    if (hobbyPlace && hobbyId) {
        document.getElementById('search-result').innerText = `${hobbyId} 검색 결과입니다. 아래 장소에서 즐길 수 있습니다.`;
        currentKeyword = hobbyId; // hobbyId를 키워드로 저장
        search(hobbyPlace);
    }
});
