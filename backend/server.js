const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { insertData, getData } = require('./db'); // db.js에서 함수 가져오기

const app = express();
app.use(cors());
app.use(bodyParser.json());

// 1. 데이터를 저장하는 API (POST 요청)
app.post('/save', (req, res) => {
  const { value } = req.body; // 클라이언트에서 보낸 데이터 추출
  if (!value) {
    return res.status(400).json({ message: 'Value is required!' });
  }

  // 데이터베이스에 값 삽입
  insertData(value, (err, result) => {
    if (err) {
      console.error('데이터 저장 오류:', err);
      return res.status(500).json({ message: '데이터 저장 실패' });
    }
    res.json({ message: 'Data saved successfully!', id: result.insertId });
  });
});

// 2. 저장된 데이터를 조회하는 API (GET 요청)
app.get('/data', (req, res) => {
  getData((err, results) => {
    if (err) {
      console.error('데이터 조회 오류:', err);
      return res.status(500).json({ message: '데이터 조회 실패' });
    }
    res.json({ data: results });
  });
});

// 서버 실행
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`서버가 실행 중입니다: http://localhost:${PORT}`);
});
