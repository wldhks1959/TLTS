use user_db;

create table userinfo
(
	user_id char(32) primary key not null,
	user_name char(8) not null,
	user_pwd char(256) not null, -- 해시된 비밀번호
	user_addr char(40)  -- ㅇㅇ광역시 ㅇㅇ구 ㅇㅇ로 000-0 << 이런게 20글자 정도
);

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