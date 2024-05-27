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
    "./img/marker_red.png",
    new kakao.maps.Size(24, 35)
);

// 검색 마커 아이콘을 설정합니다
var searchMarkerImage = new kakao.maps.MarkerImage(
    "./img/marker_yellow.png",
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

// 인포윈도우가 열려 있는지 상태를 저장할 변수
var infowindowOpen = false;

// 마커에 클릭 이벤트를 등록합니다
kakao.maps.event.addListener(marker, "click", function () {
    if (infowindowOpen) {
        // 인포윈도우가 열려 있으면 닫습니다
        infowindow.close();
        infowindowOpen = false;
    } else {
        // 인포윈도우가 닫혀 있으면 엽니다
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
    // 지도 중심을 이동 시킵니다
    map.setCenter(centerCoords);

    // 마커 위치도 이동 시킵니다
    marker.setPosition(centerCoords);
}

// 지도 중심을 부드럽게 이동시키는 함수
function panTo() {
    // 지도 중심을 부드럽게 이동시킵니다
    // 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동
    map.panTo(centerCoords);

    // 마커 위치도 이동
    marker.setPosition(centerCoords);
}

// 키워드로 장소를 검색하는 함수
function searchKeyword(callback) {
    var keyword = document.getElementById("keyword").value;
    if (!keyword.trim()) {
        alert("키워드를 입력하세요.");
        return;
    }

    // 장소 검색 객체를 생성
    var ps = new kakao.maps.services.Places();

    // 현재 지도 중심을 기준으로 3km 반경 내에서 키워드로 장소를 검색
    var placesSearchCB = function (data, status, pagination) {
        if (status === kakao.maps.services.Status.OK) {
            // 기존 마커를 모두 제거
            clearMarkers();
            // debugging 용 
            console.log(data);
            console.log(data.length);
            console.log(status);
            
            // 검색된 장소 위치를 기준으로 마커를 생성
            var bounds = new kakao.maps.LatLngBounds();
            for (var i = 0; i < data.length; i++) {
                displayMarker(data[i]);
                bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
            }
            map.setBounds(bounds);
            callback(true);
        } else {
            callback(false);
        }
    };

    // 현재 지도 중심 좌표를 기준으로 검색
    var center = map.getCenter();
    var options = {
        location: center,
        radius: 3000, // 3km 반경
        sort: kakao.maps.services.SortBy.DISTANCE,
    };
    ps.keywordSearch(keyword, placesSearchCB, options);
}

// 검색하기 버튼을 눌렀을 때 실행되는 함수
function search() {
    searchKeyword(function(keywordSuccess) {
        if (!keywordSuccess) {
            alert("검색 결과가 없습니다.");
        }
    });
}

// 마커를 담을 배열입니다
var markers = [];

// 현재 열린 인포윈도우를 저장할 변수
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

    // 마커에 클릭 이벤트를 등록합니다
    kakao.maps.event.addListener(marker, "click", function () {
        if (currentInfowindow) {
            currentInfowindow.close();
        }
        localInfowindow.open(map, marker);
        currentInfowindow = localInfowindow;
    });

    // 생성된 마커를 배열에 추가
    markers.push(marker);
}

// 기존 마커를 모두 제거
function clearMarkers() {
    for (var i = 0; i < markers.length; i++) 
        markers[i].setMap(null);
    markers = [];
    if (currentInfowindow) {
        currentInfowindow.close();
        currentInfowindow = null;
    }
}
