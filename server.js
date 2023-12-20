// Express 및 필요한 모듈 가져오기
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');

// Express 애플리케이션 및 포트 설정
const app = express();
const port = 5500;

// MySQL 연결 설정
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'mydatabase',
});

// CORS 설정
const corsOptions = {
  origin: ['http://127.0.0.1:5500', 'http://localhost:5500'], // 클라이언트의 주소
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'User-Id'], // 허용할 요청 헤더
};

app.use(cors(corsOptions));

// JSON 파싱 미들웨어를 app.use 아래에 배치
app.use(bodyParser.json());

// 세션 미들웨어 설정
app.use(session({
  secret: 'your-secret-key', // 세션 암호화를 위한 비밀 키
  resave: false,
  saveUninitialized: true,
}));

// MySQL 연결
db.connect((err) => {
  if (err) {
    console.error('MySQL 연결 오류:', err);
  } else {
    console.log('MySQL DB에 연결되었습니다.');
  }
});

// POST 요청 파싱을 위한 미들웨어 설정
app.use(bodyParser.urlencoded({ extended: true }));

// 로그인 요청 처리
app.post('/login', (req, res) => {
  try {
    const { userId } = req.body;

    // 데이터베이스에서 회원 정보 확인
    const query = `SELECT * FROM users WHERE userId = ?`;
    db.query(query, [userId], (err, result) => {
      if (err) {
        console.error('데이터베이스 오류:', err);
        res.status(500).json({ error: '로그인 실패', message: '데이터베이스 오류 발생', errorDetails: err.message });
      } else if (result.length > 0) {
        console.log('로그인 성공');
        const user = result[0];
        res.json({ userId: user.userId });
      } else {
        console.log('로그인 실패: 일치하는 회원 정보 없음');
        res.status(400).json({ error: '로그인 실패', message: '일치하는 회원 정보가 없습니다. 아이디를 다시 한 번 확인해주세요.' });
      }
    });
  } catch (error) {
    console.error('서버 오류:', error);
    res.status(500).json({ error: '서버 오류', message: '서버 오류 발생', errorDetails: error.message });
  }
});

// 로그아웃 엔드포인트
app.post('/logout', (req, res) => {
  res.json({ message: '로그아웃되었습니다.' });
});

// 이전화면으로 버튼 클릭 시 로그인 상태 확인
app.get('/check-login', (req, res) => {
  // 로그인 상태를 확인하는 로직을 작성하고,
  // loggedIn 변수에 true 또는 false 값을 설정
  const loggedIn = req.session && req.session.user; // 예시: 세션을 사용한 로그인 상태 확인

  res.json({ loggedIn }); // 클라이언트에게 로그인 상태를 JSON 형식으로 반환
});

// 회원가입 요청 처리
app.post('/join', (req, res) => {
  try {
    const { userId, password, phone, email, username } = req.body;

    // 데이터베이스에서 회원 정보 확인 (중복된 아이디 체크)
    const checkQuery = `SELECT * FROM users WHERE userId = ?`;
    db.query(checkQuery, [userId], (checkErr, checkResult) => {
      if (checkErr) {
        console.error('데이터베이스 오류:', checkErr);
        res.status(500).json({ error: '회원가입 실패', message: '데이터베이스 오류 발생', errorDetails: checkErr.message });
      } else if (checkResult.length > 0) {
        // 이미 존재하는 아이디인 경우
        console.log('회원가입 실패: 중복된 아이디');
        res.status(400).json({ error: '회원가입 실패', message: '이미 존재하는 아이디입니다. 다른 아이디를 사용해주세요.' });
      } else {
        // 중복된 아이디가 없는 경우, 신규 회원 정보를 데이터베이스에 삽입
        const insertQuery = `INSERT INTO users (userId, password, phone, email, username) VALUES (?, ?, ?, ?, ?)`;
        db.query(insertQuery, [userId, password, phone, email, username], (insertErr, insertResult) => {
          if (insertErr) {
            console.error('데이터베이스 오류:', insertErr);
            res.status(500).json({ error: '회원가입 실패', message: '데이터베이스 오류 발생', errorDetails: insertErr.message });
          } else {
            console.log('회원가입 성공');
            res.json({ success: true });
          }
        });
      }
    });
  } catch (error) {
    console.error('서버 오류:', error);
    res.status(500).json({ error: '서버 오류', message: '서버 오류 발생', errorDetails: error.message });
  }
});

// 서버를 지정된 포트에서 실행
app.listen(port, () => {
  console.log(`서버가 ${port} 포트에서 실행 중입니다.`);
});