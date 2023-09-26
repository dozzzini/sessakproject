// const express = require('express');
// const cors = require('cors');
// const app = express();
// const port = process.env.PORT || 3000; // 포트 번호를 필요에 따라 변경

// // CORS 설정
// const allowedOrigins = ['http://localhost:3000', 'https://port-0-sessak-back2-cgw1f2almhig6l2.sel5.cloudtype.app/api/v1']; // 허용할 도메인 목록 추가
// const corsOptions = {
//   origin: function (origin, callback) {
//     if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   methods: 'GET,POST,PUT,DELETE',
//   allowedHeaders: 'Content-Type,Authorization',
//   credentials: true,
//   maxAge: 3600, // 1 hour
// };

// app.use(cors(corsOptions));

// // 라우트 및 서버 설정 추가
// // ...

// // 서버 시작
// app.listen(port, () => {
//   console.log(`서버가 ${port} 포트에서 실행 중입니다.`);
// });
