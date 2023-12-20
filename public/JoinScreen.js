// 회원가입 함수
function join() {
  // 각 입력 필드의 값을 가져옴
  const userId = document.getElementById('userId').value;
  const password = document.getElementById('password').value;
  const phone = document.getElementById('phone').value;
  const email = document.getElementById('email').value;
  const username = document.getElementById('username').value;

  // 입력값이 비어있는지 여부 확인
  if (!userId || !password || !phone || !email || !username) {
    alert('양식을 모두 작성해주세요!');
    return;
  }

  // 사용자 데이터 객체 생성
  const userData = {
    userId: userId,
    password: password,
    phone: phone,
    email: email,
    username: username
  };

  // JSON.stringify를 사용하여 body를 JSON 문자열로 변환하고 서버로 전송
  fetch('http://localhost:5500/join', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  })
  .then(response => {
    if (!response.ok) {
      // 서버 응답이 오류인 경우 추가 처리
      return response.json().then(errorData => {
        // 이미 존재하는 아이디일 때의 처리를 추가
        if (errorData.message === '이미 존재하는 아이디입니다. 다른 아이디를 사용해주세요.') {
          window.confirm('이미 존재하는 아이디입니다. 다른 아이디를 사용해주세요.');
          return;
        } else {
          throw new Error(errorData.message);
        }
      });
    }
    return response.json();
  })
  .then(data => {
    // 회원가입 성공 시 응답 결과 처리 함수 호출
    handleResponse(data);
  })
  .catch(error => {
    console.error('클라이언트 오류:', error);
  });
}

// 회원가입 응답 결과 처리 함수
function handleResponse(data) {
  if (data) {
    if (data.success) {
      // 회원가입 성공 시 알림창 보여줌
      alert('회원가입을 축하합니다! 즐거운 하루 되세요!');
    } else {
      // 회원가입 실패 시의 처리
      alert('회원가입에 실패했습니다. 다시 시도해주세요.');
    }
  }

  // 가입 후 입력 칸의 내용을 지우기
  document.getElementById('userId').value = '';
  document.getElementById('password').value = '';
  document.getElementById('phone').value = '';
  document.getElementById('email').value = '';
  document.getElementById('username').value = '';
}

// 뒤로 가기 함수
function goBack() {
  window.open("MainScreen.html");
  window.close();
}
