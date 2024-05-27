-- 예시
-- insert into hobbies value ('취미이름', '취미장소', '실내/외', '솔플/멀티', '직접/관람', '정적/적당히/동적', '힐링/버닝', '예약필요O/X', '장비필요O/X', '자기개발/오락', '평범/이색');
-- 취미이름, 취미장소, indoor/outdoor, solo/multi, play/watch, static/normal/dynamic, healing/burning, yes/no, yes/no, self development/fun, normal/special

-- 일반취미
-- 그림그리기, 뜨개질, 종이접기, 캘리그래피, 비즈공예, 꽃꽃이, 
insert into hobbies value ('그림그리기', null, 'indoor', 'solo', 'play', 'static', 'healing', 'no', 'yes', 'fun', 'normal');
insert into hobbies value ('뜨개질', null, 'indoor', 'solo', 'play', 'static', 'healing', 'no', 'yes', 'fun', 'normal');
insert into hobbies value ('종이접기', null, 'indoor', 'solo', 'play', 'static', 'healing', 'no', 'yes', 'fun', 'special');
insert into hobbies value ('캘리그래피', null, 'indoor', 'solo', 'play', 'static', 'healing', 'no', 'yes', 'fun', 'normal');
insert into hobbies value ('비즈공예', null, 'indoor', 'solo', 'play', 'static', 'healing', 'no', 'yes', 'fun', 'normal');
insert into hobbies value ('꽃꽃이', null, 'indoor', 'solo', 'play', 'static', 'healing', 'no', 'yes', 'fun', 'normal');
-- 하이킹, 등산, 캠핑, 낚시, 실내클라이밍, 암벽등반, 사이클링, 서핑, 수영,
insert into hobbies value ('하이킹', '산', 'outdoor', null, 'play', 'dynamic', 'healing', 'no', 'yes', 'fun', 'normal');
insert into hobbies value ('등산', '산', 'outdoor', null, 'play', 'dynamic', 'healing', 'no', 'yes', 'fun', 'normal');
insert into hobbies value ('캠핑', 'outdoor', null, 'play', 'normal', 'healing', 'no', 'yes', '', '', 'normal');
insert into hobbies value ('낚시', 'outdoor', null, 'play', 'normal', 'healing', 'no', 'yes', '', '', 'normal');
insert into hobbies value ('실내클라이밍', 'indoor', 'solo', 'play', 'dynamic', 'burning', 'no', '', '', '', 'normal');
insert into hobbies value ('암벽등반', 'outdoor', 'solo', 'play', 'dynamic', 'burning', 'no', '', '', '', 'normal');
insert into hobbies value ('사이클링', 'outdoor', 'solo', 'play', 'dynamic', 'burning', 'no', 'yes', '', '', 'normal');
insert into hobbies value ('서핑', 'outdoor', 'solo', 'play', 'dynamic', 'burning', 'no', '', '', '', '');
insert into hobbies value ('수영', null, 'solo', 'play', 'dynamic', 'burning', 'no', 'yes', '', '', '');
-- 농구, 배구, 축구, 풋살, 야구, 골프, 볼링, 당구, 포켓볼, 복싱, 레슬링, 유도, 태권도, 가라데, 검도, 펜싱, 
insert into hobbies value ('농구', null, 'multi', 'play', 'dynamic', 'burning', '', '', '', '', '');
insert into hobbies value ('배구', 'indoor', 'multi', 'play', 'dynamic', 'burning', '', '', '', '', '');
insert into hobbies value ('축구', 'outdoor', 'multi', 'play', 'dynamic', 'burning', '', '', '', '', '');
insert into hobbies value ('풋살', 'indoor', 'multi', 'play', 'dynamic', 'burning', '', '', '', '', '');
insert into hobbies value ('야구', 'outdoor', 'multi', 'play', 'normal', 'burning', '', '', '', '', '');
insert into hobbies value ('골프', 'outdoor', 'multi', 'play', 'normal', 'burning', '', '', '', '', '');
insert into hobbies value ('볼링', 'indoor', null, 'play', 'normal', 'burning', '', '', '', '', '');
insert into hobbies value ('당구', 'indoor', null, 'play', 'normal', 'burning', '', '', '', '', '');
insert into hobbies value ('포켓볼', 'indoor', null, 'play', 'normal', 'burning', '', '', '', '', '');
insert into hobbies value ('복싱', 'indoor', 'multi', 'play', 'dynamic', 'burning', '', '', '', '', '');
insert into hobbies value ('레슬링', 'indoor', 'multi', 'play', 'dynamic', 'burning', '', '', '', '', '');
insert into hobbies value ('유도', 'indoor', 'multi', 'play', 'dynamic', 'burning', '', '', '', '', '');
insert into hobbies value ('태권도', 'indoor', null, 'play', 'dynamic', 'burning', '', '', '', '', '');
insert into hobbies value ('가라데', 'indoor', null, 'play', 'dynamic', 'burning', '', '', '', '', '');
insert into hobbies value ('검도', 'indoor', 'multi', 'play', 'dynamic', 'burning', '', '', '', '', '');
insert into hobbies value ('펜싱', 'indoor', 'multi', 'play', 'dynamic', 'burning', '', 'yes', '', '', '');
-- 러닝, 요가, 필라테스, 헬스, 크로스핏, 파워리프팅, 테니스, 탁구, 배드민턴, 스쿼시, 
insert into hobbies value ('러닝', null, 'solo', 'play', 'dynamic', 'burning', '', '', '', '', '');
insert into hobbies value ('요가', 'indoor', 'solo', 'play', 'normal', 'healing', '', '', '', '', '');
insert into hobbies value ('필라테스', 'indoor', 'solo', 'play', 'normal', 'burning', '', '', '', '', '');
insert into hobbies value ('헬스', 'indoor', 'solo', 'play', 'dynamic', 'burning', 'no', '', '', '', '');
insert into hobbies value ('크로스핏', 'indoor', 'solo', 'play', 'dynamic', 'burning', 'no', '', '', '', '');
insert into hobbies value ('파워리프팅', 'indoor', 'solo', 'play', 'dynamic', 'burning', 'no', '', '', '', '');
insert into hobbies value ('테니스', null, 'multi', 'play', 'dynamic', 'burning', '', '', '', '', '');
insert into hobbies value ('탁구', 'indoor', 'multi', 'play', 'dynamic', 'burning', '', '', '', '', '');
insert into hobbies value ('배드민턴', null, 'multi', 'play', 'dynamic', 'burning', '', '', '', '', '');
insert into hobbies value ('스쿼시', 'indoor', null, 'play', 'dynamic', 'burning', '', '', '', '', '');
-- 양궁, 스키, 스케이트보드, 스노우보드, 아이스스케이트, 롤러스케이트,
insert into hobbies value ('양궁', null, 'solo', 'play', 'normal', 'burning', 'no', '', '', '', '');
insert into hobbies value ('스키', 'outdoor', 'solo', 'play', 'dynamic', 'burning', 'no', '', '', '', '');
insert into hobbies value ('스케이트보드', 'outdoor', 'solo', 'play', 'dynamic', 'burning', 'no', '', '', '', '');
insert into hobbies value ('스노우보드', 'outdoor', 'solo', 'play', 'dynamic', 'burning', 'no', '', '', '', '');
insert into hobbies value ('아이스스케이트', 'indoor', 'solo', 'play', 'dynamic', 'burning', 'no', '', '', '', '');
insert into hobbies value ('롤러스케이트', null, 'solo', 'play', 'dynamic', 'burning', 'no', '', '', '', '');
-- 춤, 노래, 악기연주, 
insert into hobbies value ('춤', null, 'solo', 'play', 'dynamic', 'burning', 'no', '', '', '', '');
insert into hobbies value ('노래', null, 'solo', 'play', 'normal', 'burning', 'no', '', '', '', '');
insert into hobbies value ('악기연주', null, 'solo', 'play', 'normal', 'burning', 'no', '', '', '', '');
-- 독서, 글쓰기, 일기쓰기, 다이어리꾸미기, 블로그운영, 명상, 영화관람, 전시회관람, 미술관관람, 클래식관람, 콘서트관람, 스포츠관람, 
insert into hobbies value ('독서', 'indoor', 'solo', 'play', 'static', 'healing', 'no', '', '', '', '');
insert into hobbies value ('글쓰기', 'indoor', 'solo', 'play', 'static', 'healing', 'no', '', '', '', '');
insert into hobbies value ('일기쓰기', 'indoor', 'solo', 'play', 'static', 'healing', 'no', '', '', '', '');
insert into hobbies value ('다이어리꾸미기', 'indoor', 'solo', 'play', 'static', 'healing', 'no', '', '', '', '');
insert into hobbies value ('블로그운영', 'indoor', 'solo', 'play', 'static', 'healing', 'no', '', '', '', '');
insert into hobbies value ('명상', 'indoor', 'solo', 'play', 'static', 'healing', 'no', '', '', '', '');
insert into hobbies value ('영화관람', 'indoor', 'solo', 'watch', 'static', 'healing', 'yes', '', '', '', '');
insert into hobbies value ('전시회관람', 'indoor', 'solo', 'watch', 'static', 'healing', 'yes', '', '', '', '');
insert into hobbies value ('미술관관람', 'indoor', 'solo', 'watch', 'static', 'healing', 'yes', '', '', '', '');
insert into hobbies value ('클래식관람', 'indoor', 'solo', 'watch', 'static', 'healing', 'yes', '', '', '', '');
insert into hobbies value ('콘서트관람', null, 'solo', 'watch', 'static', 'healing', 'yes', '',  '', '', '');
insert into hobbies value ('스포츠관람', null, 'solo', 'watch', 'static', 'healing', 'yes', '',  '', '', '');
-- 소모임만들기, 사진촬영, 국내여행, 해외여행, 자원봉사, 온라인게임, 보드게임, 애니메이션감상, 드라이브, 
insert into hobbies value ('소모임만들기', null, 'multi', 'play', 'static', 'healing', 'yes', '', '', '', '');
insert into hobbies value ('사진촬영', null, 'solo', 'play', 'static', 'healing', 'no', '', '', '', '');
insert into hobbies value ('국내여행', 'outdoor', null, null, 'normal', 'healing', 'yes', '', '', '', '');
insert into hobbies value ('해외여행', 'outdoor', null, null, 'normal', 'healing', 'yes', '', '', '', '');
insert into hobbies value ('자원봉사', null, null, 'play', 'normal', 'healing', 'yes', '', '', '', '');
insert into hobbies value ('온라인게임', 'indoor', 'multi', 'play', 'static', 'burning', 'no', '', '', '', '');
insert into hobbies value ('보드게임', 'indoor', 'multi', 'play', 'static', 'burning', 'no', '', '', '', '');
insert into hobbies value ('애니메이션감상', 'indoor', 'solo', 'watch', 'static', 'healing', 'no', '', '', '', '');
insert into hobbies value ('드라이브', 'outdoor', 'solo', null, 'normal', 'healing', 'no', '', '', '', '');
-- 요리, 베이킹, 홈텐딩, 홈카페, 원예, 청소, 
-- 외국어공부, 주식공부,
insert into hobbies value ('요리', 'indoor', 'solo', 'play', 'static', 'healing', 'no', '', '', '', '');
insert into hobbies value ('베이킹', 'indoor', 'solo', 'play', 'static', 'healing', 'no', '', '', '', '');
insert into hobbies value ('홈텐딩', 'indoor', 'solo', 'play', 'static', 'healing', 'no', '', '', '', '');
insert into hobbies value ('홈카페', 'indoor', 'solo', 'play', 'static', 'healing', 'no', '', '', '', '');
insert into hobbies value ('원예', 'indoor', 'solo', 'play', 'static', 'healing', 'no', '', '', '', '');
insert into hobbies value ('청소', 'indoor', 'solo', 'play', 'burning', 'no', '', '', '', '', '');
insert into hobbies value ('외국어공부', 'indoor', 'solo', 'play', 'static', 'healing', 'no', '', '', '', '');
insert into hobbies value ('주식공부', 'indoor', 'solo', 'play', 'static', 'healing', 'no', '', '', '', '');
-- 이색취미
-- 도시탐방, 코스프레, RC카, 드론, 아마추어전파통신, 수상레저, 도자기공예, 조각하기, 목공예, 향수만들기, 애완돌키우기,
insert into hobbies value ('도시탐방', 'outdoor', 'solo', null, 'normal', 'healing', 'no', '', '', '', '');
insert into hobbies value ('코스프레', null, 'solo', null, 'static', 'burning', 'no', '', '', '', 'special');
insert into hobbies value ('RC카', null, 'solo', 'play', 'static', 'burning', 'no', '', '', '', 'special');
insert into hobbies value ('드론', null, 'solo', 'play', 'static', 'burning', 'no', '', '', '', 'special');
insert into hobbies value ('아마추어전파통신', 'indoor', null, 'play', 'static', 'healing', 'no', '', '', '', 'special');
insert into hobbies value ('수상레저', 'outdoor', null, 'play', 'dynamic', 'burning', '', '', '', '', '');
insert into hobbies value ('도자기공예', 'indoor', 'solo', 'play', 'static', 'healing', '', '', '', '', '');
insert into hobbies value ('조각하기', 'indoor', 'solo', 'play', 'static', 'healing', '', '', '', '', '');
insert into hobbies value ('목공예', 'indoor', 'solo', 'play', 'static', 'healing', '', '', '', '', '');
insert into hobbies value ('향수만들기', 'indoor', 'solo', 'play', 'static', 'healing', '', '', '', '', 'special');
insert into hobbies value ('애완돌키우기', 'indoor', 'solo', null, 'static', 'healing', 'no', '', '', '', 'special');
-- 사격, DIY인테리어, 옷리폼하기, 수집하기, 덕질, 스노쿨링, 스쿠버다이빙, 패러글라이딩, 
insert into hobbies value ('사격', null, 'solo', 'play', 'normal', 'burning', '', '', '', '', '');
insert into hobbies value ('DIY인테리어', 'indoor', 'solo', 'play', 'static', 'healing', 'no', '', '', '', 'special');
insert into hobbies value ('옷리폼하기', 'indoor', 'solo', 'play', 'static', 'healing', 'no', '', '', '', 'special');
insert into hobbies value ('수집하기', null, 'solo', 'play', 'static', 'healing', 'no', '', '', 'fun', 'special');
insert into hobbies value ('덕질', null, 'solo', null, 'static', 'healing', 'no', '', '', 'fun', 'special');
insert into hobbies value ('스노쿨링', 'outdoor', null, 'play', 'dynamic', 'burning', 'yes', '', '', 'fun', 'special');
insert into hobbies value ('스쿠버다이빙', 'outdoor', null, 'play', 'dynamic', 'burning', 'yes', '', '', 'fun', 'special');
insert into hobbies value ('패러글라이딩', 'outdoor', null, 'play', 'dynamic', 'burning', 'yes', '', '', 'fun', 'special');
