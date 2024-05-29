const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'user_db'
});

db.connect((err) => {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + db.threadId);
});

// userTable
const createUserInfo = `
  create table if not exists userinfo (
    user_id char(32) primary key not null,
    user_name char(8) not null,
    user_pwd char(255) not null, -- 해시된 비밀번호
    user_addr char(40)  -- ㅇㅇ광역시 ㅇㅇ구 ㅇㅇ로 000-0 << 이런게 20글자 정도
  )
`;

// hobbies
const createHobbies = `
  create table if not exists hobbies(
    hobby_id char(20) primary key not null, -- 취미 이름
    hobby_place char(20), -- 취미 즐길 장소
    I_O ENUM ('indoor', 'outdoor', 'ANY'), -- 실내, 실외
    S_M ENUM ('solo', 'multi', 'ANY'), -- 혼자/여럿
    P_W ENUM ('play', 'watch', 'ANY'), -- 직접/관람
    MV ENUM ('static', 'normal', 'dynamic'), -- 안뜀/적당히뜀/존나뜀
    H_B ENUM ('healing', 'burning', 'ANY'), -- 힐링, 불태우기
    RESV ENUM ('yes', 'no', 'ANY'), -- 예약 필수 여부
    EQUIP ENUM('yes', 'no', 'ANY'), -- 장비 필요 유무
    SD_F ENUM('self development', 'fun', 'ANY'), -- 자기개발인지 오락인지
    NORM ENUM('normal', 'special', 'ANY') -- 이색/보편
  )
`;

const createHobbiesImage = `
  create table if not exists hobbiesimage(
    hobby_id char(20),
    image_path char(60),
    foreign key (hobby_id) references hobbies (hobby_id)
  )
`;

db.query(createUserInfo, (err, result) => {
  if (err) throw err;
  console.log("UserInfo created or already exists.");
});

db.query(createHobbies, (err, result) => {
  if (err) throw err;
  console.log("Hobbies created or already exists.");
});

db.query(createHobbiesImage, (err, result) => {
  if (err) throw err;
  console.log("HobbiesImage created or already exists.");
});

module.exports = db;