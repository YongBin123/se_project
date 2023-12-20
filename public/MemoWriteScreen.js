// 메모 저장 함수
function saveMemo() {
  // 메모 텍스트를 가져옴
  var memoText = document.getElementById('memoText').value;

  // 메모 텍스트가 비어있지 않은 경우에만 처리
  if (memoText !== '') {
      // 새로운 메모 객체 생성
      const newMemo = { memoText: memoText };

      // 서버로 메모 데이터 전송
      fetch('http://localhost:5500/saveMemo', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(newMemo),
      })
      .then((response) => response.json())
      .then((data) => {
          // 응답 결과에 따라 처리하는 함수 호출
          handleResponse('save', data.success, data.error);
          if (data.success) {
              // 성공적으로 저장된 경우, 메모 엘리먼트 생성 및 입력 칸 초기화
              createMemoElement(newMemo);
              document.getElementById('memoText').value = '';
          }
      })
      .catch((error) => {
          console.error('서버와의 통신 중 오류 발생:', error);
      });
  }

  // 입력 칸 초기화
  document.getElementById('memoText').value = '';
}

// 응답 결과 처리 함수
function handleResponse(action, success, error) {
  if (success) {
      // 성공적인 경우 알림창 출력
      alert('메모 저장 완료');
  } else {
      // 실패한 경우 콘솔에 에러 출력 및 알림창 출력
      console.error(`메모 ${action} 실패: ${error}`);
      alert(`메모 ${action} 실패: ${error}`);
  }
}

// 메모 엘리먼트 생성 함수
function createMemoElement(memo, memoDiv = null) {
  if (!memoDiv) {
      // 새로운 메모 엘리먼트를 생성하고 클래스 및 id 설정
      memoDiv = document.createElement('div');
      memoDiv.classList.add('memo-item');
      memoDiv.id = memo.id;
  }

  // 메모 내용 엘리먼트 생성 또는 가져오기
  var memoContent = memoDiv.querySelector('p');
  if (!memoContent) {
      memoContent = document.createElement('p');
      memoDiv.appendChild(memoContent);
  }
  memoContent.textContent = memo.memoText;

  // "수정" 버튼 생성
  var editButton = memoDiv.querySelector('.edit-btn');
  if (!editButton) {
      editButton = document.createElement('span');
      editButton.classList.add('edit-btn');
      editButton.textContent = '수정';
      editButton.onclick = function () {
          console.log('수정 버튼 클릭됨'); // 콘솔에 출력
          editMemo(memo.id);
      };
      memoDiv.appendChild(editButton);
  }

  // "삭제" 버튼 생성
  var deleteButton = memoDiv.querySelector('.delete-btn');
  if (!deleteButton) {
      deleteButton = document.createElement('span');
      deleteButton.classList.add('delete-btn');
      deleteButton.textContent = '삭제';
      deleteButton.onclick = function () {
          // 클라이언트 측에서 메모 삭제 요청을 보냄
          deleteMemo(memo.id);

          // 화면에서 삭제된 메모를 제거
          memoDiv.remove();
      };
      memoDiv.appendChild(deleteButton);
  }

  // "저장" 버튼 생성
  var saveButton = memoDiv.querySelector('.save-btn');
  if (!saveButton) {
      saveButton = document.createElement('span');
      saveButton.classList.add('save-btn');
      saveButton.textContent = '저장';
      saveButton.style.display = 'none'; // 초기에는 숨겨둠
      saveButton.onclick = function () {
          modifyMemo(memo.id); // "저장" 버튼 클릭 시 업데이트 함수 호출
      };
      memoDiv.appendChild(saveButton);
  }

  // 메모 엘리먼트를 화면에 추가
  var savedMemos = document.getElementById('savedMemos');
  savedMemos.appendChild(memoDiv);
}

// 뒤로 가기 함수
function goBack() {
  window.open('Memo.html');
  window.close();
}