-- 만약 취미 테이블에 키워드 추가한다면? --> 유저 피드백 후 업데이트 할 때 사용.

-- 1. 테이블에 column 추가.
-- 예시 : alter table hobbies add column 키워드 ENUM ('휘뚜루', '마뚜루') not null default '휘뚜루';

-- 2. 이후 취미별 column 값 수정.
-- 예시 : update hobbies set 키워드 = '마뚜루' where hobby_id = '취미 이름';
-- 모든 취미별로 업데이트 해줘야 함 --> 피드백 업데이트 시 모든 취미에 대해 적용.