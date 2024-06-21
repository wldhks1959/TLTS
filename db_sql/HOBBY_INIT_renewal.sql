-- SQLBook: Code
-- 예시
-- insert into hobbies value ('취미이름', '취미장소', '실내/외', '솔플/멀티', '직접/관람', '정적/적당히/동적', '힐링/버닝', '예약필요O/X', '장비필요O/X', '자기개발/오락', '평범/이색');
-- 취미이름, 취미장소, indoor/outdoor, solo/multi, play/watch, static/normal/dynamic, healing/burning, yes/no, yes/no, self development/fun, normal/special

-- 일반취미
-- 그림그리기, 뜨개질, 종이접기, 캘리그래피, 비즈공예, 꽃꽃이, 
insert into hobbies value ('그림그리기', '미술학원', 'indoor', 'solo', 'play', 'static', 'healing', 'no', 'yes', 'fun', 'normal');
insert into hobbies value ('뜨개질', 'ANY', 'indoor', 'solo', 'play', 'static', 'healing', 'no', 'yes', 'fun', 'normal');
insert into hobbies value ('종이접기', 'ANY', 'indoor', 'solo', 'play', 'static', 'healing', 'no', 'yes', 'fun', 'special');
insert into hobbies value ('캘리그래피', '캘리그래피', 'indoor', 'solo', 'play', 'static', 'healing', 'no', 'yes', 'fun', 'normal');
insert into hobbies value ('비즈공예', '비즈공예', 'indoor', 'solo', 'play', 'static', 'healing', 'no', 'yes', 'fun', 'normal');
insert into hobbies value ('꽃꽂이', '플로리스트', 'indoor', 'solo', 'play', 'static', 'healing', 'no', 'yes', 'fun', 'normal');
-- 하이킹, 등산, 캠핑, 낚시, 실내클라이밍, 암벽등반, 사이클링, 서핑, 수영,
insert into hobbies value ('하이킹', '산', 'outdoor', 'ANY', 'play', 'dynamic', 'healing', 'no', 'no', 'fun', 'normal');
insert into hobbies value ('등산', '산', 'outdoor', 'ANY', 'play', 'dynamic', 'healing', 'no', 'no', 'fun', 'normal');
insert into hobbies value ('캠핑', '캠핑장', 'outdoor', 'ANY', 'play', 'normal', 'healing', 'no', 'yes', 'fun', 'normal');
insert into hobbies value ('낚시', '강',  'outdoor', 'ANY', 'play', 'normal', 'healing', 'no', 'yes', 'fun', 'normal');
insert into hobbies value ('실내클라이밍', '클라이밍장', 'indoor', 'solo', 'play', 'dynamic', 'burning', 'no', 'no', 'fun', 'normal');
insert into hobbies value ('야외암벽등반', '인공암벽장', 'outdoor', 'solo', 'play', 'dynamic', 'burning', 'no', 'no', 'fun', 'normal');
insert into hobbies value ('사이클링', 'ANY', 'outdoor', 'solo', 'play', 'dynamic', 'burning', 'no', 'yes', 'fun', 'normal');
insert into hobbies value ('서핑', '해수욕장', 'outdoor', 'solo', 'play', 'dynamic', 'burning', 'no', 'yes', 'fun', 'normal');
insert into hobbies value ('수영', '수영', 'ANY', 'solo', 'play', 'dynamic', 'burning', 'no', 'yes', 'fun', 'normal');
-- 농구, 배구, 축구, 풋살, 야구, 골프, 볼링, 당구, 포켓볼, 복싱, 레슬링, 유도, 태권도, 가라데, 검도, 펜싱, 
insert into hobbies value ('농구', '농구', 'ANY', 'multi', 'play', 'dynamic', 'burning', 'yes', 'yes', 'fun', 'normal');
insert into hobbies value ('배구', '체육관', 'indoor', 'multi', 'play', 'dynamic', 'burning', 'yes', 'yes', 'fun', 'normal');
insert into hobbies value ('축구', '축구', 'outdoor', 'multi', 'play', 'dynamic', 'burning', 'yes', 'yes', 'fun', 'normal');
insert into hobbies value ('풋살', '풋살', 'indoor', 'multi', 'play', 'dynamic', 'burning', 'yes', 'yes', 'fun', 'normal');
insert into hobbies value ('야구', '야구', 'outdoor', 'multi', 'play', 'normal', 'burning', 'yes', 'yes', 'fun', 'normal');
insert into hobbies value ('골프', '골프', 'outdoor', 'multi', 'play', 'normal', 'burning', 'yes', 'yes', 'fun', 'normal');
insert into hobbies value ('볼링', '볼링', 'indoor', 'ANY', 'play', 'normal', 'burning', 'no', 'no', 'fun', 'normal');
insert into hobbies value ('당구', '당구', 'indoor', 'ANY', 'play', 'normal', 'burning', 'no', 'no', 'fun', 'normal');
insert into hobbies value ('포켓볼', '당구', 'indoor', 'ANY', 'play', 'normal', 'burning', 'no', 'no', 'fun', 'normal');
insert into hobbies value ('복싱', '복싱', 'indoor', 'multi', 'play', 'dynamic', 'burning', 'yes', 'no', 'fun', 'normal');
insert into hobbies value ('주짓수', '주짓수', 'indoor', 'multi', 'play', 'dynamic', 'burning', 'yes', 'no', 'fun', 'normal');
insert into hobbies value ('레슬링', '레슬링', 'indoor', 'multi', 'play', 'dynamic', 'burning', 'yes', 'no', 'fun', 'special');
insert into hobbies value ('유도', '유도장', 'indoor', 'multi', 'play', 'dynamic', 'burning', 'yes', 'no', 'fun', 'normal');
insert into hobbies value ('태권도', '태권도', 'indoor', 'ANY', 'play', 'dynamic', 'burning', 'yes', 'no', 'fun', 'normal');
insert into hobbies value ('가라데', '가라데', 'indoor', 'ANY', 'play', 'dynamic', 'burning', 'yes', 'no', 'fun', 'special');
insert into hobbies value ('검도', '검도', 'indoor', 'multi', 'play', 'dynamic', 'burning', 'yes', 'yes', 'fun', 'normal');
insert into hobbies value ('펜싱', '펜싱', 'indoor', 'multi', 'play', 'dynamic', 'burning', 'yes', 'yes', 'fun', 'special');
-- 러닝, 요가, 필라테스, 헬스, 크로스핏, 파워리프팅, 테니스, 탁구, 배드민턴, 스쿼시, 
insert into hobbies value ('러닝', 'ANY', 'ANY', 'solo', 'play', 'dynamic', 'burning', 'no', 'no', 'fun', 'normal');
insert into hobbies value ('요가', '요가', 'indoor', 'solo', 'play', 'normal', 'healing', 'no', 'no', 'self development', 'normal');
insert into hobbies value ('필라테스', '필라테스', 'indoor', 'solo', 'play', 'normal', 'burning', 'no', 'no', 'self development', 'normal');
insert into hobbies value ('헬스', '헬스', 'indoor', 'solo', 'play', 'dynamic', 'burning', 'yes', 'no', 'self development', 'normal');
insert into hobbies value ('크로스핏', '크로스핏', 'indoor', 'solo', 'play', 'dynamic', 'burning', 'no', 'no', 'self development', 'normal');
insert into hobbies value ('파워리프팅', '헬스장', 'indoor', 'solo', 'play', 'dynamic', 'burning', 'no', 'no', 'self development', 'special');
insert into hobbies value ('테니스', '테니스', 'ANY', 'multi', 'play', 'dynamic', 'burning', 'yes', 'yes', 'fun', 'normal');
insert into hobbies value ('탁구', '탁구', 'indoor', 'multi', 'play', 'dynamic', 'burning', 'yes', 'yes', 'fun', 'normal');
insert into hobbies value ('배드민턴', '배드민턴', 'ANY', 'multi', 'play', 'dynamic', 'burning', 'yes', 'yes', 'fun', 'normal');
insert into hobbies value ('스쿼시', '스쿼시', 'indoor', 'ANY', 'play', 'dynamic', 'burning', 'yes', 'yes', 'fun', 'normal');
-- 양궁, 스키, 스케이트보드, 스노우보드, 아이스스케이트, 롤러스케이트,
insert into hobbies value ('양궁', '양궁', 'ANY', 'solo', 'play', 'normal', 'burning', 'yes', 'no', 'fun', 'normal');
insert into hobbies value ('스키', '스키', 'outdoor', 'solo', 'play', 'dynamic', 'burning', 'no', 'no', 'fun', 'normal');
insert into hobbies value ('스케이트보드', '스케이트', 'outdoor', 'solo', 'play', 'dynamic', 'burning', 'no', 'yes', 'fun', 'normal');
insert into hobbies value ('스노우보드', '스키', 'outdoor', 'solo', 'play', 'dynamic', 'burning', 'no', 'no', 'fun', 'normal');
insert into hobbies value ('아이스스케이트', '아이스링크', 'indoor', 'solo', 'play', 'dynamic', 'burning', 'no', 'no', 'fun', 'normal');
insert into hobbies value ('롤러스케이트', '롤러스케이트', 'ANY', 'solo', 'play', 'dynamic', 'burning', 'no', 'no', 'fun', 'normal');
-- 춤, 노래, 악기연주, 
insert into hobbies value ('춤', '댄스', 'ANY', 'solo', 'play', 'dynamic', 'burning', 'no', 'no', 'fun', 'normal');
insert into hobbies value ('노래', '보컬', 'ANY', 'solo', 'play', 'normal', 'burning', 'no', 'no', 'fun', 'normal');
insert into hobbies value ('악기연주', '악기', 'ANY', 'solo', 'play', 'normal', 'burning', 'no', 'yes', 'fun', 'normal');
-- 독서, 글쓰기, 일기쓰기, 다이어리꾸미기, 블로그운영, 명상, 영화관람, 전시회관람, 미술관관람, 클래식관람, 콘서트관람, 스포츠관람, 
insert into hobbies value ('독서', '도서관', 'indoor', 'solo', 'play', 'static', 'healing', 'no', 'yes', 'self development', 'normal');
insert into hobbies value ('글쓰기', 'ANY', 'indoor', 'solo', 'play', 'static', 'healing', 'no', 'yes', 'fun', 'normal');
insert into hobbies value ('일기쓰기', 'ANY', 'indoor', 'solo', 'play', 'static', 'healing', 'no', 'yes', 'fun', 'normal');
insert into hobbies value ('다이어리꾸미기', 'ANY', 'indoor', 'solo', 'play', 'static', 'healing', 'no', 'yes', 'fun', 'normal');
insert into hobbies value ('블로그운영', 'ANY', 'indoor', 'solo', 'play', 'static', 'healing', 'no', 'yes', 'fun', 'normal');
insert into hobbies value ('명상', 'ANY', 'indoor', 'solo', 'play', 'static', 'healing', 'no', 'no', 'self development', 'special');
insert into hobbies value ('영화관람', '영화관', 'indoor', 'solo', 'watch', 'static', 'healing', 'yes', 'no', 'fun', 'normal');
insert into hobbies value ('전시회관람', '전시회', 'indoor', 'solo', 'watch', 'static', 'healing', 'yes', 'no', 'fun', 'normal');
insert into hobbies value ('미술관관람', '미술관', 'indoor', 'solo', 'watch', 'static', 'healing', 'yes', 'no', 'fun', 'normal');
insert into hobbies value ('클래식관람', '공연', 'indoor', 'solo', 'watch', 'static', 'healing', 'yes', 'no', 'fun', 'normal');
insert into hobbies value ('콘서트관람', '콘서트장', 'ANY', 'solo', 'watch', 'static', 'healing', 'yes', 'no',  'fun', 'normal');
insert into hobbies value ('스포츠관람', '경기장', 'ANY', 'solo', 'watch', 'static', 'healing', 'yes', 'no', 'fun', 'normal');
-- 소모임만들기, 사진촬영, 국내여행, 해외여행, 자원봉사, 온라인게임, 보드게임, 애니메이션감상, 드라이브, 
insert into hobbies value ('소모임만들기', 'ANY', 'ANY', 'multi', 'play', 'static', 'healing', 'yes', 'no', 'fun', 'normal');
insert into hobbies value ('사진촬영', 'ANY', 'ANY', 'solo', 'play', 'static', 'healing', 'no', 'yes', 'fun', 'normal');
insert into hobbies value ('국내여행', 'ANY', 'outdoor', 'ANY', 'ANY', 'normal', 'healing', 'no', 'no', 'fun', 'normal');
insert into hobbies value ('해외여행', 'ANY', 'outdoor', 'ANY', 'ANY', 'normal', 'healing', 'yes', 'no', 'fun', 'normal');
insert into hobbies value ('자원봉사', 'ANY', 'ANY', 'ANY', 'play', 'normal', 'healing', 'yes', 'no', 'fun', 'normal');
insert into hobbies value ('온라인게임', 'PC', 'indoor', 'multi', 'play', 'static', 'burning', 'no', 'no', 'fun', 'normal');
insert into hobbies value ('보드게임', '보드게임', 'indoor', 'multi', 'play', 'static', 'burning', 'no', 'no', 'fun', 'normal');
insert into hobbies value ('애니메이션감상', 'ANY', 'indoor', 'solo', 'watch', 'static', 'healing', 'no', 'no', 'fun', 'normal');
insert into hobbies value ('드라이브', 'ANY', 'outdoor', 'solo', 'ANY', 'normal', 'healing', 'no', 'yes', 'fun', 'normal');
-- 요리, 베이킹, 홈텐딩, 홈카페, 원예, 청소, 
-- 외국어공부, 주식공부,
insert into hobbies value ('요리', '요리학원', 'indoor', 'solo', 'play', 'static', 'healing', 'no', 'yes', 'fun', 'normal');
insert into hobbies value ('베이킹', '베이킹', 'indoor', 'solo', 'play', 'static', 'healing', 'no', 'yes', 'fun', 'normal');
insert into hobbies value ('홈텐딩', 'ANY', 'indoor', 'solo', 'play', 'static', 'healing', 'no', 'yes', 'fun', 'normal');
insert into hobbies value ('홈카페', 'ANY', 'indoor', 'solo', 'play', 'static', 'healing', 'no', 'yes', 'fun', 'normal');
insert into hobbies value ('원예', 'ANY', 'indoor', 'solo', 'play', 'static', 'healing', 'no', 'yes', 'fun', 'normal');
insert into hobbies value ('청소', 'ANY', 'indoor', 'solo', 'play', 'static', 'healing', 'no', 'yes', 'fun', 'special');
insert into hobbies value ('외국어공부', 'ANY', 'indoor', 'solo', 'play', 'static', 'healing', 'no', 'no', 'self development', 'special');
insert into hobbies value ('주식공부', 'ANY', 'indoor', 'solo', 'play', 'static', 'healing', 'no', 'no', 'self development', 'special');
-- 이색취미
-- 도시탐방, 코스프레, RC카, 드론, 아마추어전파통신, 수상레저, 도자기공예, 조각하기, 목공예, 향수만들기, 애완돌키우기,
insert into hobbies value ('도시탐방', 'ANY', 'outdoor', 'solo', 'ANY', 'normal', 'healing', 'no', 'no', 'fun', 'special');
insert into hobbies value ('코스프레', 'ANY', 'ANY', 'solo', 'ANY', 'static', 'healing', 'no', 'yes', 'fun', 'special');
insert into hobbies value ('RC카', 'ANY', 'ANY', 'solo', 'play', 'static', 'burning', 'no', 'yes', 'fun', 'special');
insert into hobbies value ('드론', 'ANY', 'ANY', 'solo', 'play', 'static', 'burning', 'no', 'yes', 'fun', 'special');
insert into hobbies value ('아마추어전파통신', 'ANY', 'indoor', 'ANY', 'play', 'static', 'healing', 'no', 'yes', 'fun', 'special');
insert into hobbies value ('수상레저', '수상레저', 'outdoor', 'ANY', 'play', 'dynamic', 'burning', 'yes', 'no', 'fun', 'special');
insert into hobbies value ('도자기공예', '도자기', 'indoor', 'solo', 'play', 'static', 'healing', 'yes', 'yes', 'fun', 'special');
insert into hobbies value ('조각하기', '조각공방', 'indoor', 'solo', 'play', 'static', 'healing', 'yes', 'yes', 'fun', 'special');
insert into hobbies value ('목공예', '목공예공방', 'indoor', 'solo', 'play', 'static', 'healing', 'yes', 'yes', 'fun', 'special');
insert into hobbies value ('향수만들기', '향수공방', 'indoor', 'solo', 'play', 'static', 'healing', 'yes', 'yes', 'fun', 'special');
insert into hobbies value ('애완돌키우기', 'ANY', 'indoor', 'solo', 'ANY', 'static', 'healing', 'no', 'yes', 'fun', 'special');
-- 사격, DIY인테리어, 옷리폼하기, 수집하기, 덕질, 스노쿨링, 스쿠버다이빙, 패러글라이딩, 
insert into hobbies value ('사격', '사격', 'ANY', 'solo', 'play', 'normal', 'burning', 'yes', 'no', 'fun', 'special');
insert into hobbies value ('DIY인테리어', 'ANY', 'indoor', 'solo', 'play', 'static', 'healing', 'no', 'yes', 'fun', 'special');
insert into hobbies value ('옷리폼하기', 'ANY', 'indoor', 'solo', 'play', 'static', 'healing', 'no', 'yes', 'fun', 'special');
insert into hobbies value ('수집하기', 'ANY', 'ANY', 'solo', 'play', 'static', 'healing', 'no', 'no', 'fun', 'special');
insert into hobbies value ('덕질', 'ANY', 'ANY', 'solo', 'ANY', 'static', 'healing', 'no', 'no', 'fun', 'special');
insert into hobbies value ('스노쿨링', '바다', 'outdoor', 'ANY', 'play', 'dynamic', 'burning', 'yes', 'no', 'fun', 'special');
insert into hobbies value ('스쿠버다이빙', '바다', 'outdoor', 'ANY', 'play', 'dynamic', 'burning', 'yes', 'no', 'fun', 'special');
insert into hobbies value ('패러글라이딩', '패러글라이딩', 'outdoor', 'ANY', 'play', 'dynamic', 'burning', 'yes', 'no', 'fun', 'special');
