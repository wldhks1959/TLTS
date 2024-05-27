import json
import mysql

# JSON 파일 경로
json_file_path = 'dataset.json'

# JSON 파일 읽기
with open(json_file_path, 'r', encoding='utf-8') as file:
    data = json.load(file)

# MySQL 데이터베이스에 연결
conn = mysql.connector.connect(
    host="your_host",
    user="your_user",
    password="your_password",
    database="your_database"
)

cursor = conn.cursor()

# JSON 데이터에서 name과 keywords 추출하여 INSERT 문 생성 및 실행
for hobby in data['hobbies']:
    name = hobby['name']
    keywords = hobby['keywords']

    # 키워드가 12개 미만인 경우 빈 문자열로 채움
    while len(keywords) < 12:
        keywords.append('')

    # SQL INSERT 문 생성
    sql = """
    INSERT INTO hobby (names, a, b, c, d, e, f, g, h, i, j, k, l)
    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    """
    
    # SQL INSERT 문 실행
    cursor.execute(sql, (name, *keywords))

# 변경사항 커밋
conn.commit()

# 연결 닫기
cursor.close()
conn.close()
