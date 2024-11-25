const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',       // MySQL 서버 주소
    user: 'root',            // MySQL 사용자 이름
    password: 'your_password', // MySQL root 계정 비밀번호
    database: 'backend_db',  // 생성한 데이터베이스 이름
  });
  

// 데이터베이스 연결 확인
db.connect((err) => {
  if (err) {
    console.error('MySQL 연결 오류:', err);
  } else {
    console.log('MySQL에 성공적으로 연결되었습니다.');
  }
});

// 데이터 삽입 함수
const insertData = (value, callback) => {
  const sql = 'INSERT INTO data_table (value) VALUES (?)';
  db.query(sql, [value], callback);
};

// 데이터 조회 함수
const getData = (callback) => {
  const sql = 'SELECT * FROM data_table';
  db.query(sql, callback);
};

// 함수 및 연결 객체 내보내기
module.exports = { db, insertData, getData };
