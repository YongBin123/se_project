// 로그인 함수
function login() {
  // 입력된 사용자 아이디와 비밀번호 가져오기
  const userId = document.getElementById('userId').value;
  const password = document.getElementById('password').value;

  // 입력값이 비어있을 경우 로그인 시도를 막음
  if (!userId || !password) {
      alert('아이디와 비밀번호를 입력하세요.');
      return;
  }

  // 사용자 아이디 정보를 포함한 객체 생성
  const userData = {
      userId: userId,
  };

  // 서버로 로그인 요청을 전송
  fetch('http://localhost:5500/login', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
  })
  .then(response => {
      if (!response.ok) {
          // 로그인 실패 시
          return response.json().then(errorData => {
              alert(`${errorData.message}`); // 실패 메시지를 알림창으로 표시
              throw new Error(errorData.message);
          });
      }
      return response.json();
  })
  .then(data => {
      // 응답 처리 함수 호출
      handleResponse(data);
  })
  .catch(error => {
      // 실패 시에도 입력 필드의 내용을 지우고 포커스를 아이디 입력 필드로 이동
      document.getElementById('userId').value = '';
      document.getElementById('password').value = '';
      document.getElementById('userId').focus();
  });

  // 사용자 아이디를 클라이언트에 저장
  localStorage.setItem('userId', userId); // userId는 로그인한 사용자의 아이디
}

// 응답 처리 함수
function handleResponse(data) {
  // 로그인 상태를 로컬 스토리지에 저장
  localStorage.setItem('isLoggedIn', 'true');
  localStorage.setItem('userId', data.userId);

  // 로그인 성공 시 알림창 표시
  const loginMessage = document.getElementById('loginMessage');
  if (loginMessage) {
      alert('로그인 되었습니다. 오늘도 좋은 하루 되세요!');
  }

  // 입력 필드의 내용을 지우기
  document.getElementById('userId').value = '';
  document.getElementById('password').value = '';

  // 로그인 상태를 업데이트
  isLoggedIn = true;
}

// 뒤로 가기 함수
function goBack() {
  window.open("MainScreen.html");
  window.close();
}