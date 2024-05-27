const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost', // MySQL 서버 주소
  user: 'root', // MySQL 사용자 이름
  password: '0116', // MySQL 비밀번호
  database: 'user_db' // 사용할 데이터베이스 이름
});
/*
create table hobbies
(
	hobby_id char(20) primary key not null, -- 취미 이름
	hobby_place char(20), -- 취미 즐길 장소
	I_O ENUM ('indoor', 'outdoor') not null, -- 실내, 실외
	S_M ENUM ('solo', 'multi') not null, -- 혼자/여럿
	P_W ENUM ('play', 'watch') not null, -- 직접/관람
	MV ENUM ('static', 'normal', 'dynamic') not null, -- 안뜀/적당히뜀/존나뜀
	H_B ENUM ('healing', 'burning') not null, -- 힐링, 불태우기
	RESV ENUM ('yes', 'no') not null, -- 예약 필수 여부
	EQUIP ENUM('yes', 'no') not null, -- 장비 필요 유무
	SD_F ENUM('self development', 'fun') not null, -- 자기개발인지 오락인지
	NORM ENUM('normal', 'special') not null -- 이색/보편
);
*/
connection.connect((err) => {
  if (err) {
    console.error('데이터베이스 연결 실패:', err.stack);
    return;
  }
  console.log('데이터베이스 연결 성공:', connection.threadId);
});

module.exports = connection;
